import Head from 'next/head';
import Link from 'next/link';
import { 
  ArrowLeft,
  Zap, 
  TrendingUp, 
  Users, 
  Target,
  Award,
  Clock,
  CheckCircle,
  Lightbulb,
  Rocket,
  BarChart3,
  Globe
} from 'lucide-react';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - DX² Digital Experience Squared</title>
        <meta name="description" content="We don't just improve websites. We square them. Learn how DX² turns small changes into exponential business growth." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">DX²</h1>
                  <p className="text-sm text-gray-500">Digital Experience Squared</p>
                </div>
              </Link>
              
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Home
                </Link>
                <span className="text-blue-600 font-medium">About</span>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Pricing
                </Link>
                <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Free Analysis
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              <span>The Team Behind Exponential Growth</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              We Don't Just Improve.{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                We Square.
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              At DX², we believe in the compound effect. Small, strategic improvements 
              don't add up—they multiply. That's the science of exponential growth.
            </p>
          </div>

          {/* Our Mission */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To prove that you don't need to spend $50,000 or wait 6 months for a website 
                  that drives real business results. We deliver exponential improvements in days, 
                  not months—because your business can't wait for perfect.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">3-5</div>
                  <div className="text-sm text-gray-600">Business Days</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-600">10x</div>
                  <div className="text-sm text-gray-600">ROI Average</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">500+</div>
                  <div className="text-sm text-gray-600">Businesses Squared</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-orange-600">$500</div>
                  <div className="text-sm text-gray-600">Starting Price</div>
                </div>
              </div>
            </div>
          </div>

          {/* The DX² Difference */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">The DX² Difference</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're not another web agency. We're business growth accelerators who happen to build websites.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3">Data-Driven Strategy</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Every recommendation is backed by conversion psychology, user behavior data, 
                  and proven growth principles.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>A/B tested layouts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Conversion optimization</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>User experience research</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3">Speed Without Sacrifice</h3>
                <p className="text-gray-600 text-sm mb-4">
                  We move fast because we've systemized excellence. Our process delivers 
                  premium results in record time.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>3-5 day delivery</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Same-day revisions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Instant support</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3">ROI Guarantee</h3>
                <p className="text-gray-600 text-sm mb-4">
                  We're so confident in our results, we guarantee 3x ROI within 90 days 
                  or we'll work for free until you get it.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>3x ROI guarantee</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>90-day tracking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Free optimization until met</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Our Approach */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16 border border-blue-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Approach: The Square Method</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Small improvements compound exponentially. Here's how we square your digital experience:
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Analyze</h3>
                <p className="text-gray-600 text-sm">
                  AI-powered analysis identifies exactly what's holding your website back
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Prioritize</h3>
                <p className="text-gray-600 text-sm">
                  We focus on the 20% of changes that drive 80% of results
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Execute</h3>
                <p className="text-gray-600 text-sm">
                  Our team implements changes with precision and speed
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">²</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Square</h3>
                <p className="text-gray-600 text-sm">
                  Watch small improvements multiply into exponential growth
                </p>
              </div>
            </div>
          </div>

          {/* Why Value Leadership */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Why We Lead on Value</h2>
                </div>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Most agencies charge $10k-50k and take 3-6 months. We realized this is backwards. 
                    Small businesses need results now, not perfect websites later.
                  </p>
                  <p>
                    By focusing on the fundamentals that actually drive growth—not fancy animations 
                    or complex features—we deliver better results faster and cheaper.
                  </p>
                  <p className="font-medium text-gray-900">
                    Our secret? We've automated the grunt work and focus our humans on strategy.
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-4">Traditional Agency vs DX²</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Time to Launch</span>
                    <div className="text-right">
                      <div className="text-red-600 text-sm line-through">3-6 months</div>
                      <div className="text-green-600 font-bold">3-5 days</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Starting Price</span>
                    <div className="text-right">
                      <div className="text-red-600 text-sm line-through">$10,000+</div>
                      <div className="text-green-600 font-bold">$500</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Revisions</span>
                    <div className="text-right">
                      <div className="text-red-600 text-sm line-through">2-3 rounds</div>
                      <div className="text-green-600 font-bold">Unlimited</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Results Guarantee</span>
                    <div className="text-right">
                      <div className="text-red-600 text-sm line-through">Hope & pray</div>
                      <div className="text-green-600 font-bold">3x ROI</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Square Your Website?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join 500+ businesses who've discovered that small changes create exponential growth. 
              Start with a free analysis and see your website's squared potential.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                href="/"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Get Free Analysis
              </Link>
              <Link 
                href="/pricing"
                className="border border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-gray-600 mb-2">
                DX² - Digital Experience Squared
              </p>
              <p className="text-sm text-gray-500">
                © 2025 DX² • Small changes. Exponential results.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}