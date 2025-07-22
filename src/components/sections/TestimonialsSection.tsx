
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Lead Data Engineer',
      company: 'TechFlow Inc.',
      avatar: '/placeholder.svg',
      rating: 5,
      quote: 'This platform transformed our data collection workflow. We reduced our scraping setup time by 80% and our success rate improved dramatically.',
      metrics: '80% faster setup'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO',
      company: 'DataMine Solutions',
      avatar: '/placeholder.svg',
      rating: 5,
      quote: 'The real-time monitoring and smart error handling have been game-changers. Our team can focus on insights instead of infrastructure.',
      metrics: '99.9% uptime achieved'
    },
    {
      name: 'Emily Watson',
      role: 'Product Manager',
      company: 'ScrapeCorp',
      avatar: '/placeholder.svg',
      rating: 5,
      quote: 'Intuitive interface, powerful features, and excellent support. It\'s everything we needed to scale our web scraping operations.',
      metrics: '10x scale improvement'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background/50 to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm bg-primary/5">
            Customer Success Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Loved by Developers Worldwide
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of developers and data teams who trust our platform 
            for their mission-critical web scraping operations.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8">
                {/* Quote icon */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-12 h-12" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Metrics badge */}
                <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary">
                  {testimonial.metrics}
                </Badge>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '10,000+', label: 'Active Users' },
            { value: '50M+', label: 'Data Points Scraped' },
            { value: '99.9%', label: 'Average Uptime' },
            { value: '24/7', label: 'Expert Support' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
