import React, { useState } from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

const CreateBook = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        description: '',
        coverImage: null,
        file: null,
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append('title', formData.title);
        formdata.append('genre', formData.genre);
        formdata.append('description', formData.description);
        formdata.append('coverImage', formData.coverImage);
        formdata.append('file', formData.file);

        setIsLoading(true);
        try {
            await axios.post('http://localhost:3003/api/book/createbook', formdata);
            toast.success('Book created successfully');
            navigate('/dashboard/books');
        } catch (error) {
            toast.error('Failed to create the book');
        } finally {
            setIsLoading(false);
        }
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
                                <BreadcrumbPage>Create</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex items-center gap-4">
                        <Link to="/dashboard/books">
                            <Button variant={'outline'}>
                                <span className="ml-2">Cancel</span>
                            </Button>
                        </Link>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <LoaderCircle className="animate-spin" />}
                            <span className="ml-2">Submit</span>
                        </Button>
                    </div>
                </div>
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Create a new book</CardTitle>
                        <CardDescription>
                            Fill out the form below to create a new book.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6">
                            <div>
                                <label htmlFor="title">Title</label>
                                <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="genre">Genre</label>
                                <Input
                                    type="text"
                                    name="genre"
                                    id="genre"
                                    value={formData.genre}
                                    onChange={handleInputChange}
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="description">Description</label>
                                <Textarea
                                    name="description"
                                    id="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="min-h-32"
                                />
                            </div>

                            <div>
                                <label htmlFor="coverImage">Cover Image</label>
                                <Input
                                    type="file"
                                    name="coverImage"
                                    id="coverImage"
                                    onChange={handleFileChange}
                                    className="w-full"
                                />
                            </div>

                            <div>
                                <label htmlFor="file">Book File</label>
                                <Input
                                    type="file"
                                    name="file"
                                    id="file"
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

export default CreateBook;
