import img from '../assets/ai.jpg'

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-6">The Human-AI Connection</h1>
      <p className="text-lg text-gray-700 text-center mb-6">
        Exploring the seamless integration of AI and human intelligence, revolutionizing industries and enhancing everyday life.
      </p>
      
      <div className="flex flex-col lg:flex-row items-center lg:space-x-8 space-y-8 lg:space-y-0">
        <img
          src={img}
          alt="AI and Human Collaboration"
          className="w-full lg:w-1/2 h-auto rounded-lg shadow-lg transition-transform duration-500 transform hover:scale-105 hover:translate-y-2"
        />
        <div className="lg:w-1/2">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            At The Human-AI Connection, we delve into the fascinating world where artificial intelligence meets human creativity. Our mission is to shed light on how this synergy is transforming various industries and improving the quality of life.
          </p>
          <h2 className="text-3xl font-semibold mb-4">What We Offer</h2>
          <p className="text-gray-700 mb-4">
            Through insightful articles, interviews with industry experts, and deep dives into cutting-edge technologies, we aim to provide our readers with valuable knowledge and perspectives on the evolving landscape of AI and its integration with human capabilities.
          </p>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-3xl font-semibold mb-4">Join the Conversation</h2>
        <p className="text-gray-700 mb-4">
          We believe in the power of community and collaboration. Share your thoughts, experiences, and insights with us as we explore the limitless possibilities of AI and human intelligence together.
        </p>
        <button className="p-2 bg-[#fc8019] text-white rounded-md hover:bg-[#e57312] transition duration-300">
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default AboutPage;
