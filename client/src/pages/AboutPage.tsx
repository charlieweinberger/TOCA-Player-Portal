export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About TOCA</h1>
        <p className="text-xl text-gray-600">The Best Place for Soccer</p>
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Our progressive soccer program invites soccer players of all ages
            and experience levels to reach their full potential. We believe that
            every player deserves access to world-class coaching,
            technology-enhanced training, and a supportive community.
          </p>
          <p className="text-gray-600 mb-4 leading-relaxed">
            TOCA Soccer is the official training partner of Major League Soccer
            (MLS), and we're proud to serve 50,000+ happy players across North
            America.
          </p>
          <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
            <p className="text-green-900 font-semibold">
              ⚽ Official Soccer Training Partner of MLS
            </p>
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600 mb-2">50K+</div>
            <p className="text-gray-600 font-medium">Happy Players</p>
            <p className="text-gray-500 mt-4">Across North America</p>
          </div>
        </div>
      </div>

      {/* How TOCA Helps Players Improve */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          How TOCA Helps You Improve
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Personalized Training Plans
            </h3>
            <p className="text-gray-600">
              Our coaches assess your strengths and areas for development to
              create individualized training plans tailored to your specific
              goals and playing style.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow p-8">
            <div className="text-4xl mb-4">🔧</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Technology-Enhanced Training
            </h3>
            <p className="text-gray-600">
              We use advanced technology like the TOCA Touch Trainer ball
              delivery system to provide precise, data-driven feedback on your
              performance and progress.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow p-8">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Rapid Skill Improvement
            </h3>
            <p className="text-gray-600">
              Our technology-enhanced, personalized approach builds skill
              improvement, confidence, and helps you excel on the field in
              competitive games.
            </p>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="bg-gray-50 rounded-lg p-12 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kids Classes */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-2xl font-bold text-green-600 mb-3">
              Kids Soccer Classes
            </h3>
            <p className="text-gray-600 mb-4">
              <strong>Ages:</strong> 1-13 (varies by center)
            </p>
            <p className="text-gray-600 mb-4">
              Uniquely designed for every age group, our classes are perfect for
              beginners through experienced players. We focus on fun, fitness,
              and friendship while helping your child grow their soccer skills
              and love for the game.
            </p>
            <p className="text-sm text-gray-500">
              Fun, fitness, and friendship await!
            </p>
          </div>

          {/* Private Training */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-2xl font-bold text-green-600 mb-3">
              Private Training
            </h3>
            <p className="text-gray-600 mb-4">
              <strong>Ages:</strong> 7-18+
            </p>
            <p className="text-gray-600 mb-4">
              Perfect for club/select team level players. Our 1:1 personalized
              training builds rapid skill improvement, confidence, and prepares
              you to excel in competitive games.
            </p>
            <p className="text-sm text-gray-500">
              Get a free first session with a personalized assessment.
            </p>
          </div>

          {/* Adult Programs */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-2xl font-bold text-green-600 mb-3">
              Adult Programs
            </h3>
            <p className="text-gray-600 mb-4">
              <strong>Ages:</strong> 18+
            </p>
            <p className="text-gray-600 mb-4">
              Join our pickup soccer sessions and adult leagues. Whether you're
              a seasoned player or new to the game, enjoy casual but competitive
              soccer with ample playing time for everyone.
            </p>
            <p className="text-sm text-gray-500">All skill levels welcome!</p>
          </div>
        </div>
      </div>

      {/* Our Commitment */}
      <div className="border-l-4 border-green-600 pl-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Our Commitment
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-4">
          At TOCA, we're committed to providing an inclusive environment where
          every player—regardless of age, experience level, or background—can
          improve their soccer skills and develop a lifelong love for the game.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          We have locations throughout the United States, Canada, and Mexico,
          making world-class soccer training accessible to communities across
          North America. Find a center closest to you and start your soccer
          journey today!
        </p>
      </div>
    </div>
  );
}
