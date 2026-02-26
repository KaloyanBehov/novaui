import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  H1,
  H2,
  H4,
  Label,
  Muted,
  Progress,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
} from '@novaui/components';
import {
  BarChart3,
  BookOpen,
  Calendar,
  CreditCard,
  HelpCircle,
  LogOut,
  Moon,
  Settings,
  User,
} from 'lucide-react-native';
import React from 'react';
import { ScrollView, View } from 'react-native';

export default function ProfileScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const iconColor = Colors[isDark ? 'dark' : 'light'].icon;
  const tintColor = Colors[isDark ? 'dark' : 'light'].tint;

  // Mock Data
  const readingStats = [
    { label: 'Books', value: '12', icon: BookOpen },
    { label: 'Pages', value: '3.4k', icon: Calendar }, // Using Calendar as placeholder for Pages icon
    { label: 'Hours', value: '48', icon: User }, // Using User as placeholder
  ];

  const weeklyActivity = [
    { day: 'M', value: 40 },
    { day: 'T', value: 70 },
    { day: 'W', value: 30 },
    { day: 'T', value: 90 },
    { day: 'F', value: 60 },
    { day: 'S', value: 20 },
    { day: 'S', value: 50 },
  ];

  const genres = [
    { name: 'Sci-Fi', value: 75, color: 'bg-blue-500' },
    { name: 'Dystopian', value: 60, color: 'bg-purple-500' },
    { name: 'Biography', value: 30, color: 'bg-green-500' },
  ];

  const recentBooks = [
    { title: '1984', date: 'Feb 20', rating: '4.5' },
    { title: 'Dune', date: 'Feb 15', rating: '5.0' },
    { title: 'Steve Jobs', date: 'Feb 10', rating: '4.8' },
    { title: 'Deep Work', date: 'Jan 28', rating: '4.2' },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120, paddingTop: 8 }}
      className="bg-background flex-1">
      {/* Header Section */}
      <View className="items-center px-6 pb-10 pt-8">
        <Avatar className="border-background mb-4 h-24 w-24 border-4 shadow-black/10 shadow-xl">
          <AvatarImage src="https://d8j0ntlcm91z4.cloudfront.net/user_38F35ZDZF7qi9WI3rwhizX30MKH/hf_20260225_010438_703dc6c2-5456-42c1-a1df-b1d34a10e635_min.webp" />
          <AvatarFallback>KB</AvatarFallback>
        </Avatar>
        <H1 className="text-center text-2xl font-bold leading-tight tracking-tight">
          Kaloyan Behov
        </H1>
        <Muted className="mb-5 text-center text-sm">@kaloyan</Muted>
        <View className="flex-row items-center gap-3">
          <Button size="sm" variant="outline" className="h-10 rounded-full px-5">
            <Text className="text-sm font-semibold">Edit Profile</Text>
          </Button>
          <Button size="icon" variant="ghost" className="bg-muted/20 h-10 w-10 rounded-full">
            <Settings size={20} color={iconColor} />
          </Button>
        </View>
      </View>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="w-full">
        <View className="mb-6 px-6">
          <TabsList className="bg-muted/30 h-12 w-full gap-2 rounded-2xl p-1">
            <TabsTrigger value="overview" className="flex-1 rounded-xl shadow-none">
              Overview
            </TabsTrigger>
            <TabsTrigger value="reading" className="flex-1 rounded-xl shadow-none">
              Reading
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex-1 rounded-xl shadow-none">
              Settings
            </TabsTrigger>
          </TabsList>
        </View>

        {/* Overview Tab */}
        <TabsContent value="overview" className="gap-6 px-6 pb-2">
          {/* Stats Cards */}
          <View className="flex-row gap-3">
            {readingStats.map((stat, index) => (
              <Card
                key={index}
                className="bg-muted/20 flex-1 items-center justify-center border-0 p-4 shadow-none">
                <View className="bg-primary/10 mb-3 h-10 w-10 items-center justify-center rounded-full">
                  <stat.icon size={20} color={tintColor} />
                </View>
                <H2 className="text-xl font-bold leading-7 tracking-tight">{stat.value}</H2>
                <Muted className="text-xs font-medium">{stat.label}</Muted>
              </Card>
            ))}
          </View>

          {/* Activity Chart (Bar Chart) */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>Pages read per day</CardDescription>
            </CardHeader>
            <CardContent>
              <View className="h-40 flex-row items-end justify-between gap-2 pt-4">
                {weeklyActivity.map((item, index) => (
                  <View key={index} className="flex-1 items-center gap-2">
                    <View
                      className="bg-primary/15 w-full overflow-hidden rounded-md"
                      style={{ height: `${item.value}%` }}>
                      <View
                        className="bg-primary absolute bottom-0 w-full"
                        style={{ height: '100%', opacity: 0.85 }}
                      />
                    </View>
                    <Text className="text-muted-foreground text-xs font-medium">{item.day}</Text>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>

          {/* Genre Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Favorite Genres</CardTitle>
            </CardHeader>
            <CardContent className="gap-4">
              {genres.map((genre, index) => (
                <View key={index} className="gap-2">
                  <View className="flex-row justify-between">
                    <Text className="text-sm font-medium tracking-tight">{genre.name}</Text>
                    <Text className="text-muted-foreground text-sm font-medium tabular-nums">
                      {genre.value}%
                    </Text>
                  </View>
                  <Progress value={genre.value} className="h-2" />
                </View>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reading Tab */}
        <TabsContent value="reading" className="gap-6 px-6 pb-2">
          {/* Current Read */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="flex-row items-center gap-4 pb-3">
              <View className="bg-muted h-16 w-12 overflow-hidden rounded-md shadow-black/5 shadow-sm">
                {/* Placeholder for book cover */}
                <View className="bg-primary/20 flex-1" />
              </View>
              <View className="flex-1 gap-1">
                <Badge variant="outline" className="border-primary/30 text-primary self-start">
                  Current Read
                </Badge>
                <H4>1984</H4>
                <Muted>George Orwell</Muted>
              </View>
            </CardHeader>
            <CardContent>
              <View className="gap-2">
                <View className="flex-row justify-between">
                  <Text className="text-muted-foreground text-xs">Progress</Text>
                  <Text className="text-xs font-medium tabular-nums">33%</Text>
                </View>
                <Progress value={33} className="h-1.5" />
              </View>
            </CardContent>
          </Card>

          {/* Recent History Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[140px]">Book</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBooks.map((book, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.date}</TableCell>
                      <TableCell className="text-right tabular-nums">{book.rating}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="gap-6 px-6 pb-2">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="gap-4">
              <View className="flex-row items-center justify-between py-1">
                <View className="flex-row items-center gap-3">
                  <Moon size={20} color={iconColor} />
                  <Label className="text-base">Dark Mode</Label>
                </View>
                <Switch checked={isDark} onCheckedChange={toggleColorScheme} />
              </View>
              <View className="flex-row items-center justify-between py-1">
                <View className="flex-row items-center gap-3">
                  <BarChart3 size={20} color={iconColor} />
                  <Label className="text-base">Usage Stats</Label>
                </View>
                <Switch checked={true} />
              </View>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="subscription" className="border-b-0 px-4">
                  <AccordionTrigger>
                    <View className="flex-row items-center gap-3">
                      <CreditCard size={18} color={iconColor} />
                      <Text className="font-medium">Subscription</Text>
                    </View>
                  </AccordionTrigger>
                  <AccordionContent>
                    <View className="bg-muted/30 gap-2 rounded-lg p-3">
                      <View className="flex-row justify-between">
                        <Text className="text-sm">Plan</Text>
                        <Badge variant="secondary">Pro</Badge>
                      </View>
                      <View className="flex-row justify-between">
                        <Text className="text-sm">Next billing</Text>
                        <Text className="text-muted-foreground text-sm tabular-nums">Mar 25, 2026</Text>
                      </View>
                    </View>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="help" className="border-b-0 px-4">
                  <AccordionTrigger>
                    <View className="flex-row items-center gap-3">
                      <HelpCircle size={18} color={iconColor} />
                      <Text className="font-medium">Help & Support</Text>
                    </View>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Text className="text-muted-foreground p-3 text-sm leading-5">
                      Need help? Contact our support team at support@novaui.com
                    </Text>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Button variant="destructive" className="mt-2 h-12 w-full rounded-xl">
            <LogOut size={18} color="#FFFFFF" className="mr-2" />
            <Text className="font-semibold">Log Out</Text>
          </Button>
        </TabsContent>
      </Tabs>
    </ScrollView>
  );
}
