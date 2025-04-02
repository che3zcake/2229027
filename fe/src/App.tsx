import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNjA4NTk0LCJpYXQiOjE3NDM2MDgyOTQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImExNGY3NDJmLTVhMGYtNGM2Yy04NTBmLWNlNWFkMjJkOWQ1YiIsInN1YiI6IjIyMjkwMjdAa2lpdC5hYy5pbiJ9LCJlbWFpbCI6IjIyMjkwMjdAa2lpdC5hYy5pbiIsIm5hbWUiOiJiLiBsYXdyZW5jZSBzaGFybWEiLCJyb2xsTm8iOiIyMjI5MDI3IiwiYWNjZXNzQ29kZSI6Im53cHdyWiIsImNsaWVudElEIjoiYTE0Zjc0MmYtNWEwZi00YzZjLTg1MGYtY2U1YWQyMmQ5ZDViIiwiY2xpZW50U2VjcmV0IjoicFl2Q2hBTUpBdEttZUtwayJ9.2ahXcR0FxhrZTJx5oym0Ps2Qz1klyx5bng-G2cjSYOU";

const App: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await axios.get(`${API_BASE_URL}/users`, {
                    headers: { Authorization: `Bearer ${TOKEN}` },
                });
                setUsers(usersResponse.data);

                const postsResponse = await axios.get(`${API_BASE_URL}/posts/popular`, {
                    headers: { Authorization: `Bearer ${TOKEN}` },
                });
                setPosts(postsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Top Users</h1>
            <ul className="mb-6">
                {users.map((user) => (
                    <li key={user.id} className="p-2 border-b">{user.name} - {user.postCount} posts</li>
                ))}
            </ul>

            <h1 className="text-3xl font-bold mb-4">Top Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id} className="p-2 border-b">{post.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
