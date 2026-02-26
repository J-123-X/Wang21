"use client"

import { ScrollReveal } from "./scroll-reveal"
import { PhotoCard } from "./photo-card"
import { PhotoCarousel } from "./photo-carousel"
import { Typewriter } from "./typewriter"
import { Heart, Stars, Sparkles, Gift, Cake } from "lucide-react"

// Photo data - replace src with your own photos
const PHOTOS = [
  { src: "/photos/photo-1.jpg", alt: "我们的合照 1", caption: "记得这一天吗？" },
  { src: "/photos/photo-2.jpg", alt: "我们的合照 2", caption: "那些快乐的时光" },
  { src: "/photos/photo-3.jpg", alt: "我们的合照 3", caption: "笑得最开心的瞬间" },
  { src: "/photos/photo-4.jpg", alt: "我们的合照 4", caption: "在一起的每一天" },
  { src: "/photos/photo-5.jpg", alt: "我们的合照 5", caption: "珍贵的回忆" },
  { src: "/photos/photo-6.jpg", alt: "我们的合照 6", caption: "最好的朋友" },
  { src: "/photos/photo-7.jpg", alt: "我们的合照 7", caption: "永远的友谊" },
  { src: "/photos/photo-8.jpg", alt: "我们的合照 8", caption: "一起走过的路" },
]

const CAROUSEL_PHOTOS = PHOTOS.slice(0, 4).map((p) => ({ src: p.src, alt: p.alt }))

// Blessing text split into paragraphs
const BLESSING_PARAGRAPHS = [
  "亲爱的汪，这是我们认识的第六年，我真的很开心，一直以来你都陪在我的身边。",
  "在我伤心时，在我沮丧时，在我自卑时，在我崩溃时，在我开心时，在我......好像每一个时刻你都在我的身边（虽然并不全是）。",
  "我很庆幸，有你这一个朋友，你让我对友情有了清晰的定义。",
  "我曾经说过，友情和爱情以及亲情同等重要，缘分使然，我们成为最好的朋友，在这个诺大的世界里，我们是没有血缘关系的最亲近的人。",
  "感谢你一直以来对我的包容、鼓励和安慰，真的感谢你的陪伴。这一路有你，我很开心，祝我们的路越来越长。",
]

const FINAL_WISH =
  "Last but not least，祝你生日快乐~~，祝可爱的汪越来越漂亮，永远开心健康！"

export function BlessingContent() {
  return (
    <main className="relative w-full overflow-hidden">
      {/* Hero section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
        <ScrollReveal direction="up" delay={300}>
          <div className="flex items-center gap-3 mb-4">
            <Cake className="w-6 h-6 text-primary" />
            <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
              {"Happy Birthday"}
            </span>
            <Cake className="w-6 h-6 text-primary" />
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={500}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground text-center text-balance leading-tight">
            {"生日快乐"}
          </h1>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={700}>
          <p className="text-2xl md:text-3xl text-primary mt-4 text-center">
            {"亲爱的汪"}
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={900}>
          <div className="flex items-center gap-2 mt-8 text-muted-foreground">
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-sm">{"认识的第六年"}</span>
            <Heart className="w-4 h-4 text-primary" />
          </div>
        </ScrollReveal>

        {/* Scroll hint */}
        <ScrollReveal direction="fade" delay={1200}>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs tracking-wider">{"向下滚动"}</span>
            <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1">
              <div className="w-1 h-2 rounded-full bg-primary animate-bounce" />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center py-6">
        <div className="h-px w-16 bg-border" />
        <Stars className="w-5 h-5 text-primary mx-4" />
        <div className="h-px w-16 bg-border" />
      </div>

      {/* Photo carousel section */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <ScrollReveal direction="up">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-2">
            {"我们的故事"}
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            {"那些年，那些珍贵的瞬间"}
          </p>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={200}>
          <PhotoCarousel photos={CAROUSEL_PHOTOS} />
        </ScrollReveal>
      </section>

      {/* Blessing text section */}
      <section className="px-6 py-16 max-w-2xl mx-auto">
        <ScrollReveal direction="up">
          <div className="flex items-center gap-2 justify-center mb-10">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {"写给你的话"}
            </h2>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          {BLESSING_PARAGRAPHS.map((text, i) => (
            <ScrollReveal key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 100}>
              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border/50">
                <p className="text-base md:text-lg leading-relaxed text-foreground">
                  {text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center justify-center py-6">
        <div className="h-px w-16 bg-border" />
        <Heart className="w-5 h-5 text-primary mx-4" />
        <div className="h-px w-16 bg-border" />
      </div>

      {/* Photo grid section */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <ScrollReveal direction="up">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-2">
            {"回忆相册"}
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            {"点击照片可以翻转查看"}
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {PHOTOS.map((photo, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 80}>
              <PhotoCard
                src={photo.src}
                alt={photo.alt}
                caption={photo.caption}
                index={i}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Final wish with typewriter */}
      <section className="px-6 py-20 max-w-2xl mx-auto text-center">
        <ScrollReveal direction="up">
          <Gift className="w-10 h-10 text-primary mx-auto mb-6" />
        </ScrollReveal>
        <Typewriter text={FINAL_WISH} speed={80} className="mb-8" />
        <ScrollReveal direction="up" delay={3000}>
          <div className="mt-10">
            <p className="text-sm text-muted-foreground">
              {"-- \u4f60\u6700\u597d\u7684\u670b\u53cb"}
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center">
        <ScrollReveal direction="fade">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <span className="text-xs">{"Made with"}</span>
            <Heart className="w-3 h-3 text-primary fill-primary" />
            <span className="text-xs">{"for you"}</span>
          </div>
        </ScrollReveal>
      </footer>
    </main>
  )
}
