import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoaderCircle } from 'lucide-react';
import axios from 'axios';

const DeleteBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    const [bookTitle, setBookTitle] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3003/api/book/books/${id}`)
            .then(response => {
                setBookTitle(response.data.title);
                setIsLoading(false);
            })
            .catch(error => {
                toast.error(`Error: ${error.response?.data?.message || error.message}`);
                setIsLoading(false);
            });
    }, [id]);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await axios.delete(`http://localhost:3003/api/book/books/${id}`);
            toast.success('Book deleted successfully');
            navigate('/dashboard/books');
        } catch (error) {
            toast.error(`Error: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <section className="flex items-center justify-center h-screen">
                <LoaderCircle className="animate-spin text-gray-500" size={32} />
            </section>
        );
    }

    return (
        <section className="flex flex-col items-center justify-center p-6 mx-auto">
            <div className="bg-white shadow-sm border-2 rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Delete Book</h2>
                <p className="text-gray-600 mb-4">
                    Are you sure you want to delete the book titled  <strong>{bookTitle}</strong>? This action cannot be undone.
                </p>
                <div className="flex gap-4">
                    <Button
                        variant={'outline'}
                        onClick={() => navigate('/dashboard/books')}
                        className="w-full max-w-xs"
                    >
                        Back
                    </Button>
                    <Button
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="w-full max-w-xs bg-red-500 text-white hover:bg-red-600"
                    >
                        {isDeleting && <LoaderCircle className="animate-spin mr-2" />}
                        <span>Delete</span>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default DeleteBook;
