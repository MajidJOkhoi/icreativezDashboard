import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HandHeart, Heart, MessageCircle, Send, Share } from "lucide-react";



const BlogPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/posts/posts"
        );
        const data = await response.json();
        if (data.success) {
          setPosts(data.data);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div className="px-8 py-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
        {posts.map((post) => (
          <Card key={post._id} className="w-full ">
            <CardHeader className="p-0">
              <img
                src={post.postImage}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-xl"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="font-semibold text-lg mb-2">
                {post.title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {post.content}
              </CardDescription>
            </CardContent>

            <div className="p-4 flex justify-between items-center text-gray-600 border-t-2">
              <button className="flex items-center hover:text-red-500 transition-colors duration-300">
                <Heart className="mr-1" /> Like
              </button>
              <button className="flex items-center hover:text-blue-500 transition-colors duration-300">
                <MessageCircle className="mr-1" /> Comment
              </button>
              <button className="flex items-center hover:text-green-500 transition-colors duration-300">
                <Send className="mr-1" /> Send
              </button>
              <button className="flex items-center hover:text-yellow-500 transition-colors duration-300">
                <Share className="mr-1" /> Share
              </button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default BlogPosts;
