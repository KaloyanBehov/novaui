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
  P,
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function ProfileScreen() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const iconColor = Colors[isDark ? 'dark' : 'light'].icon;

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
    <SafeAreaView className="bg-background flex-1" edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header Section */}
        <View className="items-center px-6 pt-6 pb-8">
          <Avatar className="h-24 w-24 border-4 border-background shadow-xl mb-4">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>KB</AvatarFallback>
          </Avatar>
          <H1 className="text-2xl font-bold text-center">Kaloyan Behov</H1>
          <Muted className="text-center mb-4">@kaloyan</Muted>
          <View className="flex-row items-center gap-3">
            <Button size="sm" variant="outline" className="rounded-full px-6 h-9">
              <Text>Edit Profile</Text>
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full h-9 w-9">
              <Settings size={20} color={iconColor} />
            </Button>
          </View>
        </View>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="w-full">
          <View className="px-6 mb-6">
            <TabsList className="w-full bg-muted/20 p-1 gap-2 rounded-xl h-12">
              <TabsTrigger value="overview" className="flex-1 rounded-lg shadow-none">Overview</TabsTrigger>
              <TabsTrigger value="reading" className="flex-1 rounded-lg shadow-none">Reading</TabsTrigger>
              <TabsTrigger value="settings" className="flex-1 rounded-lg shadow-none">Settings</TabsTrigger>
            </TabsList>
          </View>

          {/* Overview Tab */}
          <TabsContent value="overview" className="px-6 gap-6">
            {/* Stats Cards */}
            <View className="flex-row gap-3">
              {readingStats.map((stat, index) => (
                <Card key={index} className="flex-1 items-center p-4 bg-muted/20 border-0 shadow-none">
                  <stat.icon size={20} color={isDark ? '#FFFFFF' : '#000000'} className="mb-2" />
                  <H2 className="text-xl font-bold">{stat.value}</H2>
                  <Muted className="text-xs">{stat.label}</Muted>
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
                    <View key={index} className="items-center gap-2 flex-1">
                      <View 
                        className="w-full bg-primary/20 rounded-t-sm overflow-hidden" 
                        style={{ height: `${item.value}%` }}
                      >
                         <View className="w-full bg-primary absolute bottom-0" style={{ height: '100%', opacity: 0.8 }} />
                      </View>
                      <Text className="text-xs text-muted-foreground">{item.day}</Text>
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
                      <Text className="text-sm font-medium">{genre.name}</Text>
                      <Text className="text-sm text-muted-foreground">{genre.value}%</Text>
                    </View>
                    <Progress value={genre.value} className="h-2" />
                  </View>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reading Tab */}
          <TabsContent value="reading" className="px-6 gap-6">
             {/* Current Read */}
             <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="flex-row gap-4 items-center">
                <View className="h-16 w-12 bg-muted rounded shadow-sm overflow-hidden">
                   {/* Placeholder for book cover */}
                   <View className="flex-1 bg-primary/20" />
                </View>
                <View className="flex-1 gap-1">
                  <Badge variant="outline" className="self-start border-primary/30 text-primary">Current Read</Badge>
                  <H4>1984</H4>
                  <Muted>George Orwell</Muted>
                </View>
              </CardHeader>
              <CardContent>
                <View className="gap-2">
                  <View className="flex-row justify-between">
                    <Text className="text-xs text-muted-foreground">Progress</Text>
                    <Text className="text-xs font-medium">33%</Text>
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
                        <TableCell className="text-right">{book.rating}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="px-6 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
              </CardHeader>
              <CardContent className="gap-6">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3">
                    <Moon size={20} color={iconColor} />
                    <Label className="text-base">Dark Mode</Label>
                  </View>
                  <Switch checked={isDark} onCheckedChange={toggleColorScheme} />
                </View>
                <View className="flex-row items-center justify-between">
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
                      <View className="p-2 bg-muted/30 rounded-md gap-2">
                        <View className="flex-row justify-between">
                          <Text className="text-sm">Plan</Text>
                          <Badge variant="secondary">Pro</Badge>
                        </View>
                        <View className="flex-row justify-between">
                          <Text className="text-sm">Next billing</Text>
                          <Text className="text-sm text-muted-foreground">Mar 25, 2026</Text>
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
                      <Text className="text-sm text-muted-foreground p-2">
                        Need help? Contact our support team at support@novaui.com
                      </Text>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Button variant="destructive" className="w-full mt-4">
              <LogOut size={18} color="#FFFFFF" className="mr-2" />
              <Text>Log Out</Text>
            </Button>
          </TabsContent>
        </Tabs>
      </ScrollView>
    </SafeAreaView>
  );
}
