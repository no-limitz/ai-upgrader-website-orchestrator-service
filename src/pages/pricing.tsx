import Head from 'next/head';
import Link from 'next/link';
import { 
  ArrowLeft,
  Zap, 
  CheckCircle, 
  X,
  Star,
  Clock,
  Users,
  Rocket,
  Award,
  TrendingUp,
  BarChart3,
  Target,
  ArrowRight,
  DollarSign
} from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$500",
      period: "one-time",
      description: "Perfect for small businesses ready to make their first big leap",
      features: [
        "Complete website analysis",
        "Homepage redesign",
        "Mobile optimization", 
        "Basic SEO setup",
        "3-day delivery",
        "2 rounds of revisions",
        "30-day support"
      ],
      notIncluded: [
        "Multiple page redesign",
        "E-commerce features",
        "Advanced integrations"
      ],
      popular: false,
      cta: "Start Squaring",
      guarantee: "2x ROI in 60 days"
    },
    {
      name: "Growth",
      price: "$1,500",
      period: "one-time", 
      description: "Most popular choice for businesses serious about exponential growth",
      features: [
        "Everything in Starter",
        "Up to 5 page redesign",
        "E-commerce optimization",
        "Lead generation setup",
        "Analytics integration",
        "Email capture system",
        "5-day delivery",
        "Unlimited revisions",
        "90-day support"
      ],
      notIncluded: [
        "Custom development",
        "Third-party integrations"
      ],
      popular: true,
      cta: "Square My Business", 
      guarantee: "3x ROI in 90 days"
    },
    {
      name: "Scale",
      price: "$3,500",
      period: "one-time",
      description: "For businesses ready to dominate their market with a squared presence",
      features: [
        "Everything in Growth",
        "Complete website rebuild",
        "Custom development",
        "Advanced integrations",
        "Booking/scheduling system",
        "Payment processing",
        "CRM integration",
        "7-day delivery",
        "Unlimited revisions",
        "6-month support",
        "Quarterly optimization"
      ],
      notIncluded: [],
      popular: false,
      cta: "Square My Market",
      guarantee: "5x ROI in 90 days"
    }
  ];

  const addOns = [
    {
      name: "Rush Delivery",
      price: "$200",
      description: "Get your squared website in 24-48 hours"
    },
    {
      name: "Extra Pages",
      price: "$150",
      description: "Additional page redesign (per page)"
    },
    {
      name: "Advanced SEO",
      price: "$300", 
      description: "Comprehensive SEO audit and optimization"
    },
    {
      name: "Conversion Tracking",
      price: "$250",
      description: "Full analytics and conversion funnel setup"
    }
  ];

  return (
    <>
      <Head>
        <title>Pricing - DX² Digital Experience Squared</title>
        <meta name="description" content="Value-driven website transformation starting at $500. 3-5 day delivery. ROI guaranteed. See our pricing plans." />
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
                <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                  About
                </Link>
                <span className="text-blue-600 font-medium">Pricing</span>
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
            <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <DollarSign className="w-4 h-4" />
              <span>Value Leader Pricing • ROI Guaranteed</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Value That{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Squares Up
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Premium results at honest prices. No hidden fees, no monthly charges, 
              no 6-month contracts. Just exponential growth, guaranteed.
            </p>
          </div>

          {/* Value Proposition */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 mb-16 border border-orange-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why DX² Costs 80% Less</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We've cracked the code on delivering premium results without premium waste
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Rocket className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Efficiency</h3>
                <p className="text-gray-600 text-sm">
                  Automation handles the busy work, humans focus on strategy
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Laser Focus</h3>
                <p className="text-gray-600 text-sm">
                  We only build what drives results, not vanity features
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Proven Systems</h3>
                <p className="text-gray-600 text-sm">
                  500+ projects refined into a perfected process
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Volume Economics</h3>
                <p className="text-gray-600 text-sm">
                  Lower prices through efficiency, not corner-cutting
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Squared Future</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Every plan includes our signature guarantee: if we don't deliver the promised ROI, 
                we'll keep working for free until we do.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div 
                  key={index}
                  className={`relative bg-white rounded-2xl shadow-lg border-2 p-8 ${
                    plan.popular 
                      ? 'border-blue-500 ring-4 ring-blue-100' 
                      : 'border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-500 ml-2">{plan.period}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{plan.description}</p>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Award className="w-4 h-4 text-green-600" />
                        <span className="text-green-800 text-sm font-medium">{plan.guarantee}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.notIncluded.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Not included:</h4>
                        <ul className="space-y-2">
                          {plan.notIncluded.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start space-x-3">
                              <X className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-500 text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <button
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                      plan.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Power-Ups & Add-Ons</h2>
              <p className="text-gray-600">
                Supercharge your squared website with these optional enhancements
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {addOns.map((addon, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">{addon.name}</h3>
                    <p className="text-gray-600 text-sm">{addon.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">{addon.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16 border border-blue-100">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">The Real Cost Comparison</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                When you factor in time, opportunity cost, and guaranteed results, 
                DX² isn't just cheaper—it's the smartest investment you'll make.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-4 font-semibold text-gray-900">Option</th>
                    <th className="text-center p-4 font-semibold text-gray-900">Upfront Cost</th>
                    <th className="text-center p-4 font-semibold text-gray-900">Time Investment</th>
                    <th className="text-center p-4 font-semibold text-gray-900">Results Timeline</th>
                    <th className="text-center p-4 font-semibold text-gray-900">ROI Guarantee</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">DIY (Wix/Squarespace)</div>
                      <div className="text-sm text-gray-500">+ your 40-80 hours</div>
                    </td>
                    <td className="text-center p-4">
                      <div className="text-gray-900">$20-50/mo</div>
                      <div className="text-sm text-gray-500">~$600/year</div>
                    </td>
                    <td className="text-center p-4">
                      <div className="text-red-600 font-medium">40-80 hours</div>
                      <div className="text-sm text-gray-500">@$100/hr = $8,000</div>
                    </td>
                    <td className="text-center p-4">
                      <div className="text-gray-900">3-6 months</div>
                      <div className="text-sm text-gray-500">If ever</div>
                    </td>
                    <td className="text-center p-4">
                      <div className="text-red-600">None</div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">Traditional Agency</div>
                      <div className="text-sm text-gray-500">Premium service</div>
                    </td>
                    <td className="text-center p-4">
                      <div className="text-gray-900">$10,000-50,000</div>
                      <div className="text-sm text-gray-500">+ monthly retainer</div>
                    </td>
                    <td className="text-center p-4">
                      <div className="text-yellow-600">10-20 hours</div>
                      <div className="text-sm text-gray-500">Project management</div>
                    </td>
                    <td className="text-center p-4">
                      <div className="text-gray-900">3-6 months</div>
                      <div className="text-sm text-gray-500">Maybe</div>
                    </td>
                    <td className="text-center p-4">
                      <div className="text-yellow-600">Sometimes</div>
                    </td>
                  </tr>
                  <tr className="bg-blue-50">
                    <td className="p-4">
                      <div className="font-bold text-blue-900">DX² Growth Plan</div>
                      <div className="text-sm text-blue-700">Most popular choice</div>
                    </td>
                    <td className="text-center p-4">
                      <div className="text-blue-900 font-bold">$1,500</div>
                      <div className="text-sm text-blue-700">One-time</div>
                    </td>
                    <td className="text-center p-4">
                      <div className="text-green-600 font-bold">2-3 hours</div>
                      <div className="text-sm text-blue-700">Onboarding only</div>
                    </td>
                    <td className="text-center p-4">
                      <div className="text-blue-900 font-bold">5 days</div>
                      <div className="text-sm text-blue-700">Guaranteed</div>
                    </td>
                    <td className="text-center p-4">
                      <div className="text-green-600 font-bold">3x ROI</div>
                      <div className="text-sm text-blue-700">90 days</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-center">
              <p className="text-lg font-semibold text-blue-900">
                Total Real Cost: DIY = $8,600+ | Agency = $15,000+ | DX² = $1,500
              </p>
              <p className="text-blue-700 text-sm mt-2">
                Plus, we're the only option that guarantees your ROI or keeps working for free.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What makes DX² different from other agencies?</h3>
                  <p className="text-gray-600 text-sm">
                    We focus on exponential improvements through small, strategic changes. Our AI-human hybrid approach 
                    delivers results 10x faster at 80% lower cost, with guaranteed ROI.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What if I'm not happy with the results?</h3>
                  <p className="text-gray-600 text-sm">
                    If we don't deliver the promised ROI within the guarantee period, we'll continue working 
                    for free until we do. No questions asked.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Do you work with all business types?</h3>
                  <p className="text-gray-600 text-sm">
                    We specialize in service-based businesses, e-commerce, and local businesses. 
                    If you serve customers online, we can square your results.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">How do you deliver so fast?</h3>
                  <p className="text-gray-600 text-sm">
                    Our process is systematized through 500+ projects. AI handles analysis and initial design, 
                    humans add strategy and refinement. No wasted time on unnecessary features.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What about ongoing maintenance?</h3>
                  <p className="text-gray-600 text-sm">
                    All plans include support periods. For ongoing optimization, we offer quarterly 
                    check-ins at $300/quarter to keep your results squared.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Can I upgrade my plan later?</h3>
                  <p className="text-gray-600 text-sm">
                    Absolutely! You can upgrade at any time and we'll credit what you've already paid 
                    toward the higher tier.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Square Your Results?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Start with a free analysis to see exactly how we'll transform your website. 
              No commitment, no cost, just insights that could change your business.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                href="/"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center space-x-2"
              >
                <span>Get Free Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="border border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 rounded-lg transition-colors">
                Schedule Consultation
              </button>
            </div>

            <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-blue-100">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>3-5 Day Delivery</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4" />
                <span>ROI Guaranteed</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4" />
                <span>500+ Success Stories</span>
              </div>
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