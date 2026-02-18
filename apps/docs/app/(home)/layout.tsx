import Footer from '@/components/footer'
import { baseOptions } from '@/lib/layout.shared'
import { HomeLayout } from 'fumadocs-ui/layouts/home'
export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden">{children}</main>
      <Footer />
    </HomeLayout>
  )
}
