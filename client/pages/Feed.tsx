import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  doc,
  getDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, MessageSquare, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { SeedButton } from '@/components/SeedButton';

interface Post {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: any;
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { userProfile, logout } = useAuth();

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const postsData: Post[] = [];
      
      for (const docSnapshot of snapshot.docs) {
        const postData = { id: docSnapshot.id, ...docSnapshot.data() } as Post;
        
        if (!postData.authorName && postData.authorId) {
          try {
            const userDoc = await getDoc(doc(db, 'users', postData.authorId));
            if (userDoc.exists()) {
              postData.authorName = userDoc.data().name;
            }
          } catch (err) {
            console.error('Error fetching user data:', err);
          }
        }
        
        postsData.push(postData);
      }
      
      setPosts(postsData);
      setPostsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPost.trim()) {
      setError('Please write something to post');
      return;
    }

    if (!userProfile) {
      setError('You must be logged in to post');
      return;
    }

    try {
      setError('');
      setLoading(true);
      
      await addDoc(collection(db, 'posts'), {
        content: newPost.trim(),
        authorId: userProfile.uid,
        authorName: userProfile.name,
        createdAt: serverTimestamp()
      });
      
      setNewPost('');
    } catch (err: any) {
      setError(err.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return 'Just now';
    
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return 'Just now';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Community</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <SeedButton />

            <Link to={`/profile/${userProfile?.uid}`} className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-600 text-white">
                  {userProfile?.name ? getInitials(userProfile.name) : 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-700">{userProfile?.name}</span>
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="text-gray-600 hover:text-gray-900"
            >
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Create Post Card */}
        <Card className="mb-8 shadow-sm">
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">What's on your mind?</h2>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmitPost} className="space-y-4">
              <Textarea
                placeholder="Share your thoughts with the community..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                disabled={loading}
                className="min-h-[100px] resize-none"
              />
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={loading || !newPost.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Post
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-6">
          {postsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Loading posts...</span>
            </div>
          ) : posts.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-600">Be the first to share something with the community!</p>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id} className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-600 text-white">
                        {post.authorName ? getInitials(post.authorName) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <Link 
                          to={`/profile/${post.authorId}`} 
                          className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {post.authorName || 'Unknown User'}
                        </Link>
                        <span className="text-gray-500">•</span>
                        <span className="text-sm text-gray-500">
                          {formatTimestamp(post.createdAt)}
                        </span>
                      </div>
                      
                      <p className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                        {post.content}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
