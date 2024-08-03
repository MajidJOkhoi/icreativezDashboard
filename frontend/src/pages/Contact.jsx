// pages/Contact.jsx
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';

const Contact = () => {
  return (
   <>

<div className="max-w-lg mx-auto p-8">
  <Card className="py-8 p-8">

    <CardTitle className="text-center py-8 text-2xl">  Contact Form </CardTitle>


      <form className="flex flex-col space-y-4">
        <Input
          type="text"
          className="p-2"
          placeholder="Your Name"
        />
        <Input
          type="email"
          className="p-2"
          placeholder="Your Email Address"
        />
        <Input
          type="text"
          className="p-2 "
          placeholder="Subject"
        />
        <Textarea
          className="p-2 rounded-md"
          placeholder="Your Message"
          rows="4"
        />
        <Button
          type="submit"
           variant="outline"
          className="p-2"
        >
          Send Message
        </Button>
      </form>
    </Card>
    </div>
   
   
   </>
  );
};

export default Contact;
