import express from 'express'
import cors from 'cors'
import axios from 'axios'

const app = express()

app.use(cors())

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNjA4NTk0LCJpYXQiOjE3NDM2MDgyOTQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImExNGY3NDJmLTVhMGYtNGM2Yy04NTBmLWNlNWFkMjJkOWQ1YiIsInN1YiI6IjIyMjkwMjdAa2lpdC5hYy5pbiJ9LCJlbWFpbCI6IjIyMjkwMjdAa2lpdC5hYy5pbiIsIm5hbWUiOiJiLiBsYXdyZW5jZSBzaGFybWEiLCJyb2xsTm8iOiIyMjI5MDI3IiwiYWNjZXNzQ29kZSI6Im53cHdyWiIsImNsaWVudElEIjoiYTE0Zjc0MmYtNWEwZi00YzZjLTg1MGYtY2U1YWQyMmQ5ZDViIiwiY2xpZW50U2VjcmV0IjoicFl2Q2hBTUpBdEttZUtwayJ9.2ahXcR0FxhrZTJx5oym0Ps2Qz1klyx5bng-G2cjSYOU"

app.get('/users', async (req, res)=> {
    try {
        const response = await axios.get('http://20.244.56.144/evaluation-service/users', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const value = response.data['users'];
        const postCounts = {};

        for (const userId of Object.keys(value)) {
            try {
                const postResponse = await axios.get(`http://20.244.56.144/evaluation-service/users/${userId}/posts`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                postCounts[userId] = {
                    name: value[userId],
                    postCount: postResponse.data.posts.length
                };


            } catch (error) {
                console.error(`Error fetching posts for user ${userId}:`, error);
                postCounts[userId] = {
                    name: value[userId],
                    postCount: 1
                };
            }
        }

        const topUsers = Object.values(postCounts)
            .sort((a, b) => b.postCount - a.postCount)
            .slice(0, 5);
        res.json(topUsers)
    }catch(e){
        console.error('Error fetching data:', e)
    }
})

app.get('/posts', async (req, res)=>{
    const response = await axios.get('http://20.244.56.144/evaluation-service/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const value = response.data['users']
    const lst = []
    for (const userId of Object.keys(value)) {
        const postResponse = await axios.get(`http://20.244.56.144/evaluation-service/users/${userId}/posts`, {
            headers: {'Authorization': `Bearer ${token}`}
        });

        lst.add(postResponse.data.posts.id)
    }



    const { type } = req.query
    if (type === 'popular'){
        try {
            const postIds = Array.from({ length: 200 }, (_, i) => i + 100);
            for (let i = 0; i < lst.length; i++){
                try {
                    const commentResponse = await axios.get(
                        `http://20.244.56.144/evaluation-service/posts/${lst[i]}/comments`,
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        }
                    );

                    const result = commentResponse.

                    return { name: postId, commentCount };
                } catch (error) {
                    console.error(`Error fetching comments for post ${postId}:`, error);
                    return { name: postId, commentCount: 1 };
                }
            });

            const commentCounts = await Promise.all(commentRequests);

            // Get top 5 posts based on comment count
            const topPosts = commentCounts
                .sort((a, b) => b.commentCount - a.commentCount)
                .slice(0, 5);

            res.json(topPosts);
        }catch(e){
            console.error('Error fetching data:', e)
        }
    }
})

app.listen(3001,()=>{
    console.log('listening at 3001')
})