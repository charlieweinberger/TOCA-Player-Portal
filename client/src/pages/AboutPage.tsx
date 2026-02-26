import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About TOCA</h1>
        <p className="text-xl text-gray-600">The Best Place for Soccer</p>
      </div>

      {/* Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Our progressive soccer program invites soccer players of all ages
            and experience levels to reach their full potential. We believe that
            every player deserves access to world-class coaching,
            technology-enhanced training, and a supportive community.
          </p>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            TOCA Soccer is the official training partner of Major League Soccer
            (MLS), and we're proud to serve 50,000+ happy players across North
            America.
          </p>
          <Card className="bg-green-50 border-green-600 border-l-4 p-4">
            <p className="text-green-900 font-semibold">
              ⚽ Official Soccer Training Partner of MLS
            </p>
          </Card>
        </div>
        <Card className="bg-gray-100 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl font-bold text-green-600 mb-2">50K+</div>
            <p className="font-medium">Happy Players</p>
            <p className="text-muted-foreground mt-4">Across North America</p>
          </div>
        </Card>
      </div>

      {/* How TOCA Helps Players Improve */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8">How TOCA Helps You Improve</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <Card className="p-6">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-3">
              Personalized Training Plans
            </h3>
            <p className="text-muted-foreground">
              Our coaches assess your strengths and areas for development to
              create individualized training plans tailored to your specific
              goals and playing style.
            </p>
          </Card>

          {/* Card 2 */}
          <Card className="p-6">
            <div className="text-4xl mb-4">🔧</div>
            <h3 className="text-xl font-bold mb-3">
              Technology-Enhanced Training
            </h3>
            <p className="text-muted-foreground">
              We use advanced technology like the TOCA Touch Trainer ball
              delivery system to provide precise, data-driven feedback on your
              performance and progress.
            </p>
          </Card>

          {/* Card 3 */}
          <Card className="p-6">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-bold mb-3">Rapid Skill Improvement</h3>
            <p className="text-muted-foreground">
              Our technology-enhanced, personalized approach builds skill
              improvement, confidence, and helps you excel on the field in
              competitive games.
            </p>
          </Card>
        </div>
      </div>

      {/* Programs Section */}
      <div className="bg-gray-50 rounded-lg mb-16">
        <h2 className="text-3xl font-bold mb-6">Our Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kids Classes */}
          <Card className="p-6">
            <h3 className="text-2xl font-bold text-green-600 mb-3">
              Kids Soccer Classes
            </h3>
            <p className="text-muted-foreground mb-4">
              <strong>Ages:</strong> 1-13 (varies by center)
            </p>
            <p className="text-muted-foreground mb-4">
              Uniquely designed for every age group, our classes are perfect for
              beginners through experienced players. We focus on fun, fitness,
              and friendship while helping your child grow their soccer skills
              and love for the game.
            </p>
            <p className="text-sm text-muted-foreground">
              Fun, fitness, and friendship await!
            </p>
          </Card>

          {/* Private Training */}
          <Card className="p-6">
            <h3 className="text-2xl font-bold text-green-600 mb-3">
              Private Training
            </h3>
            <p className="text-muted-foreground mb-4">
              <strong>Ages:</strong> 7-18+
            </p>
            <p className="text-muted-foreground mb-4">
              Perfect for club/select team level players. Our 1:1 personalized
              training builds rapid skill improvement, confidence, and prepares
              you to excel in competitive games.
            </p>
            <p className="text-sm text-muted-foreground">
              Get a free first session with a personalized assessment.
            </p>
          </Card>

          {/* Adult Programs */}
          <Card className="p-6">
            <h3 className="text-2xl font-bold text-green-600 mb-3">
              Adult Programs
            </h3>
            <p className="text-muted-foreground mb-4">
              <strong>Ages:</strong> 18+
            </p>
            <p className="text-muted-foreground mb-4">
              Join our pickup soccer sessions and adult leagues. Whether you're
              a seasoned player or new to the game, enjoy casual but competitive
              soccer with ample playing time for everyone.
            </p>
            <p className="text-sm text-muted-foreground">
              All skill levels welcome!
            </p>
          </Card>
        </div>
      </div>

      {/* Our Commitment */}
      <Card className="border-l-4 border-green-600 p-6">
        <h2 className="text-3xl font-bold mb-4">Our Commitment</h2>
        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
          At TOCA, we're committed to providing an inclusive environment where
          every player—regardless of age, experience level, or background—can
          improve their soccer skills and develop a lifelong love for the game.
        </p>
        <p className="text-muted-foreground text-lg leading-relaxed">
          We have locations throughout the United States, Canada, and Mexico,
          making world-class soccer training accessible to communities across
          North America. Find a center closest to you and start your soccer
          journey today!
        </p>
      </Card>
    </div>
  );
}
