import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditBook = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        description: '',
        coverImageUrl: '',
        fileUrl: '',
    });
    const [coverImage, setCoverImage] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3003/api/book/books/${id}`)
            .then(response => {
                const bookData = response.data;
                setFormData({
                    title: bookData.title,
                    genre: bookData.genre,
                    description: bookData.description,
                    coverImageUrl: bookData.coverImage, // Assuming this is the URL to the existing cover image
                    fileUrl: bookData.file, // Assuming this is the URL to the existing book file
                });
            })
            .catch(error => {
                console.error('There was an error fetching the book!', error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'coverImage') {
            setCoverImage(files[0]);
        } else if (name === 'file') {
            setFile(files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('genre', formData.genre);
        data.append('description', formData.description);
        if (coverImage) data.append('coverImage', coverImage);
        if (file) data.append('file', file);

        axios.put(`http://localhost:3003/api/book/books/${id}`, data)
            .then(() => {
                toast.success('Book updated successfully');
                navigate('/dashboard/books');
            })
            .catch(error => {
                console.error('There was an error updating the book!', error);
            });
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard/home">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard/books">Books</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Edit</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard/books">
                            <Button variant={'outline'}>Cancel</Button>
                        </Link>
                        <Button type="submit">Submit</Button>
                    </div>
                </div>
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Edit the book</CardTitle>
                        <CardDescription>Fill out the form below to edit the book.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                                <Input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre</label>
                                <Input
                                    type="text"
                                    name="genre"
                                    value={formData.genre}
                                    onChange={handleInputChange}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                <Textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="min-h-32 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Cover Image</label>
                                {formData.coverImageUrl && (
                                    <div className="mb-2">
                                        <img src={formData.coverImageUrl} alt="Cover" className="max-w-xs max-h-64 object-cover rounded-md shadow-md" />
                                    </div>
                                )}
                                <Input
                                    type="file"
                                    name="coverImage"
                                    onChange={handleFileChange}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="file" className="block text-sm font-medium text-gray-700">Book File</label>
                                {formData.fileUrl && (
                                    <div className="mb-2">
                                        <a href={formData.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                            View current file
                                        </a>
                                    </div>
                                )}
                                <Input
                                    type="file"
                                    name="file"
                                    onChange={handleFileChange}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </section>
    );
};

export default EditBook;
