import { useColorScheme } from '@/hooks/use-color-scheme';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  ButtonGroup,
  ButtonGroupText,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  H1,
  H3,
  Input,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  Label,
  P,
  Progress,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Skeleton,
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
import { Image } from 'expo-image';
import {
  Bell,
  CheckCircle2,
  CircleDot,
  CreditCard,
  Filter,
  LayoutDashboard,
  LogOut,
  Moon,
  Search,
  Settings,
  ShieldCheck,
  Sun,
  User,
  Zap,
} from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { isDark, toggleColorScheme } = useColorScheme();
  const kpis = [
    {
      label: 'Net Revenue',
      value: '$248,420',
      delta: '+18.4%',
      tone: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Active Users',
      value: '14,892',
      delta: '+6.1%',
      tone: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      label: 'Conversion',
      value: '3.8%',
      delta: '+0.6%',
      tone: 'text-violet-600 dark:text-violet-400',
      bg: 'bg-violet-500/10',
    },
    {
      label: 'Churn Rate',
      value: '1.4%',
      delta: '-0.2%',
      tone: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-500/10',
    },
  ];

  const contentPadding = 'px-6';
  const sectionGap = 'gap-6';

  return (
    <SafeAreaView className="bg-background flex-1" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Top Navigation / Breadcrumbs */}
        <View className={`${contentPadding} pt-6 pb-2`}>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </View>

        {/* Header Section — 24px horizontal rhythm, aligned with content */}
        <View className={`${contentPadding} flex-col pb-6`}>
          <View className="flex w-full flex-row items-center justify-between gap-3">
            <View className="flex-1 min-w-0">
              <H1 className="text-2xl font-bold tracking-tight text-foreground">
                Dashboard
              </H1>
              <P className="mt-1 text-sm text-muted-foreground">Welcome back, Senior Designer.</P>
            </View>
            <View className="flex-row items-center gap-2">
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                <Bell size={20} className="text-foreground" />
                <View className="bg-destructive absolute right-2.5 top-2.5 h-2 w-2 rounded-full border border-white" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onPress={toggleColorScheme}>
                {isDark ? (
                  <Sun size={20} className="text-foreground" />
                ) : (
                  <Moon size={20} className="text-foreground" />
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar size="default" className="border-border border">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User size={16} className="mr-2" />
                    <Text>Profile</Text>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard size={16} className="mr-2" />
                    <Text>Billing</Text>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings size={16} className="mr-2" />
                    <Text>Settings</Text>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut size={16} className="text-destructive mr-2" />
                    <Text className="text-destructive">Log out</Text>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </View>
          </View>
        </View>

        {/* Switcher + Highlights */}
        <View className={`${sectionGap} ${contentPadding} pb-6`}>
          <ButtonGroup className="w-full">
            <Button variant="outline" className="flex-1" label="Day" />
            <Button variant="default" className="flex-1" label="Week" />
            <Button variant="outline" className="flex-1" label="Month" />
          </ButtonGroup>
          <Card className="border-border/60 bg-muted/20">
            <CardContent className="gap-2.5 p-5">
              <View className="flex-row items-center justify-between gap-3">
                <View className="flex-row items-center gap-2 min-w-0 flex-1">
                  <ShieldCheck size={18} className="text-emerald-500 shrink-0" />
                  <Text className="text-sm font-semibold text-foreground">Operations Stable</Text>
                </View>
                <Badge variant="secondary">99.98% Uptime</Badge>
              </View>
              <Text className="text-muted-foreground text-sm leading-relaxed">
                All core systems are in the green. No critical incidents in the last 7 days.
              </Text>
            </CardContent>
          </Card>
        </View>

        {/* Action Bar */}
        <View className={`flex-row items-center gap-3 ${contentPadding} pb-6`}>
          <View className="relative flex-1">
            <View className="absolute bottom-0 left-3 top-0 z-10 flex items-center justify-center">
              <Search size={18} className="text-muted-foreground" />
            </View>
            <Input
              placeholder="Search everything..."
              className="pl-10"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <Filter size={20} className="text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Filter Dashboard</SheetTitle>
                <SheetDescription>Adjust your view preferences.</SheetDescription>
              </SheetHeader>
              <View className="gap-6 py-6">
                <View className="gap-2">
                  <Label>Time Range</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Last 7 days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">Last 24 hours</SelectItem>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </View>
                <View className="flex-row items-center justify-between">
                  <Label>Show Beta Features</Label>
                  <Switch checked={true} />
                </View>
              </View>
            </SheetContent>
          </Sheet>
        </View>

        <Tabs defaultValue="overview" className={contentPadding}>
          <TabsList className="mb-5 w-full">
            <TabsTrigger value="overview" className="flex-1">
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex-1">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex-1">
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className={sectionGap}>
            {/* Quick Alert */}
            <Alert variant="default" className="border-primary/20 bg-primary/5">
              <Zap size={18} className="text-primary mr-2.5 shrink-0" />
              <View className="flex-1">
                <AlertTitle className="text-primary text-sm font-bold">Turbo Mode Active</AlertTitle>
                <AlertDescription className="text-primary/80 text-sm leading-relaxed">
                  Performance is currently optimized for your active workspace.
                </AlertDescription>
              </View>
            </Alert>

            {/* Stats Grid — 16px gap, 50% width with 8px gutter */}
            <View className="flex-row flex-wrap gap-4">
              {kpis.map((kpi) => (
                <Card
                  key={kpi.label}
                  className={`border-border/40 w-[calc(50%-8px)] ${kpi.bg} shadow-sm overflow-hidden`}>
                  <CardHeader className="p-5 pb-1">
                    <CardDescription className={`text-xs font-medium uppercase tracking-wider ${kpi.tone}`}>
                      {kpi.label}
                    </CardDescription>
                    <CardTitle className="text-xl font-bold tracking-tight mt-1">
                      {kpi.value}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-5 pb-5 pt-2">
                    <Badge variant="secondary" className={`${kpi.tone} bg-foreground/5 w-fit`}>
                      {kpi.delta}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </View>

            {/* Momentum */}
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quarter Momentum</CardTitle>
                <CardDescription className="mt-0.5">
                  Revenue goal tracking and activation mix.
                </CardDescription>
              </CardHeader>
              <CardContent className="gap-5 pt-2">
                <View className="gap-2">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-sm font-medium text-foreground">Revenue Goal</Text>
                    <Text className="text-muted-foreground text-sm">$248k / $320k</Text>
                  </View>
                  <Progress value={78} className="h-2" />
                </View>
                <View className="flex-row items-center gap-4">
                  <Card className="bg-muted/40 flex-1 border-none">
                    <CardContent className="gap-1.5 p-4">
                      <Text className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                        Activation
                      </Text>
                      <Text className="text-xl font-semibold tracking-tight text-foreground">
                        72%
                      </Text>
                      <Text className="text-muted-foreground text-xs">Onboarding completion</Text>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/40 flex-1 border-none">
                    <CardContent className="gap-1.5 p-4">
                      <Text className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                        Retention
                      </Text>
                      <Text className="text-xl font-semibold tracking-tight text-foreground">
                        89%
                      </Text>
                      <Text className="text-muted-foreground text-xs">Weekly active teams</Text>
                    </CardContent>
                  </Card>
                </View>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <View className={sectionGap}>
              <H3 className="text-base font-semibold tracking-tight text-foreground">
                Recent Activity
              </H3>
              <Card className="border-border/50 shadow-sm overflow-hidden">
                <CardContent className="p-0">
                  <ItemGroup>
                    {[
                      {
                        title: 'Design Review',
                        description: 'Senior designers are reviewing the new UI.',
                        time: '12m ago',
                        icon: 'DR',
                        color: 'bg-orange-500',
                      },
                      {
                        title: 'API Updated',
                        description: 'System-wide endpoints refreshed.',
                        time: '1h ago',
                        icon: 'AU',
                        color: 'bg-purple-500',
                      },
                      {
                        title: 'New User Joined',
                        description: 'Welcome Sarah to the engineering team.',
                        time: '2h ago',
                        icon: 'SJ',
                        color: 'bg-blue-500',
                      },
                    ].map((item, i) => (
                      <React.Fragment key={i}>
                        <Item variant="default" className="border-0 px-4 py-3">
                          <ItemMedia variant="icon" className={item.color}>
                            <Text className="text-xs font-bold text-white">{item.icon}</Text>
                          </ItemMedia>
                          <ItemContent>
                            <ItemTitle className="text-sm font-semibold">{item.title}</ItemTitle>
                            <ItemDescription className="text-sm">
                              {item.description}
                            </ItemDescription>
                          </ItemContent>
                          <Text variant="muted" className="text-xs tabular-nums">
                            {item.time}
                          </Text>
                        </Item>
                        {i < 2 && <Separator className="mx-4 bg-border/60" />}
                      </React.Fragment>
                    ))}
                  </ItemGroup>
                </CardContent>
              </Card>
            </View>

            {/* Latest Transactions */}
            <Card className="border-border/50 shadow-sm overflow-hidden">
              <CardHeader className="pb-2">
                <View className="flex-row items-center justify-between gap-3">
                  <View className="min-w-0 flex-1">
                    <CardTitle className="text-lg">Latest Transactions</CardTitle>
                    <CardDescription>Today’s billing highlights.</CardDescription>
                  </View>
                  <ButtonGroupText className="rounded-md shrink-0">USD</ButtonGroupText>
                </View>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-border/40 hover:bg-transparent">
                      <TableHead className="w-[40%] px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Client
                      </TableHead>
                      <TableHead className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Status
                      </TableHead>
                      <TableHead className="text-right px-4 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: 'Vela Studio', status: 'Paid', amount: '$4,250', tone: 'success' },
                      {
                        name: 'Nova Labs',
                        status: 'Processing',
                        amount: '$1,140',
                        tone: 'pending',
                      },
                      { name: 'Kiteworks', status: 'Overdue', amount: '$980', tone: 'overdue' },
                    ].map((row) => (
                      <TableRow key={row.name}>
                        <TableCell className="w-[40%] px-4 py-3">
                          <Text className="font-medium text-foreground">{row.name}</Text>
                        </TableCell>
                        <TableCell className="px-4 py-3">
                          <Badge
                            variant="secondary"
                            className={
                              row.tone === 'success'
                                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                                : row.tone === 'pending'
                                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                                  : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                            }>
                            {row.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right px-4 py-3 tabular-nums text-foreground">
                          {row.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Project Card */}
            <Card className="border-border/50 overflow-hidden shadow-sm">
              <Image
                source="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                style={{ height: 160, width: '100%' }}
                contentFit="cover"
              />
              <CardHeader className="pb-2">
                <View className="flex-row items-center justify-between gap-3">
                  <CardTitle className="text-lg flex-1 min-w-0">Design System Prototype</CardTitle>
                  <Badge variant="outline" className="shrink-0">In Progress</Badge>
                </View>
                <CardDescription className="mt-0.5">
                  A modern React Native UI library built with NativeWind.
                </CardDescription>
              </CardHeader>
              <CardFooter className="border-border border-t px-6 pb-6 pt-4">
                <Button variant="default" className="flex-1" label="Continue Editing" />
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className={sectionGap}>
            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">System Performance</CardTitle>
                <CardDescription className="mt-0.5">Live health monitoring status.</CardDescription>
              </CardHeader>
              <CardContent className="gap-5 pt-2">
                <View className="gap-2">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-sm font-medium text-foreground">Server Load</Text>
                    <Text className="text-muted-foreground text-sm tabular-nums">42%</Text>
                  </View>
                  <Progress value={42} className="h-2" />
                </View>
                <View className="gap-2">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-sm font-medium text-foreground">Memory Usage</Text>
                    <Text className="text-muted-foreground text-sm tabular-nums">1.2 GB / 2 GB</Text>
                  </View>
                  <Progress value={60} className="h-2" />
                </View>
                <View className="gap-2">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-sm font-medium text-foreground">Active Workers</Text>
                    <Text className="text-muted-foreground text-sm tabular-nums">18 / 20</Text>
                  </View>
                  <Progress value={90} className="h-2" />
                </View>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Deployment History</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="border-border rounded-lg border"
                />
              </CardContent>
              <CardFooter className="border-border flex-col items-start gap-4 border-t px-6 pb-6 pt-4">
                <View className="w-full gap-2">
                  <Label className="text-sm font-medium">Select Environment</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Production" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prod">Production</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="dev">Development</SelectItem>
                    </SelectContent>
                  </Select>
                </View>
              </CardFooter>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Security Compliance</CardTitle>
                <CardDescription className="mt-0.5">
                  Latest audit outcomes across environments.
                </CardDescription>
              </CardHeader>
              <CardContent className="gap-4 pt-2">
                {[
                  {
                    label: 'SOC 2 Controls',
                    desc: 'All monitoring checks passed',
                    icon: <CheckCircle2 size={16} className="text-emerald-500" />,
                  },
                  {
                    label: 'Threat Monitoring',
                    desc: '3 alerts resolved this week',
                    icon: <CircleDot size={16} className="text-amber-500" />,
                  },
                ].map((item) => (
                  <View key={item.label} className="flex-row items-center gap-3">
                    <View className="bg-muted h-9 w-9 shrink-0 items-center justify-center rounded-full">
                      {item.icon}
                    </View>
                    <View className="flex-1 min-w-0">
                      <Text className="text-sm font-medium text-foreground">{item.label}</Text>
                      <Text className="text-muted-foreground text-xs mt-0.5">{item.desc}</Text>
                    </View>
                  </View>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className={sectionGap}>
            {/* Skeleton Loading State Preview */}
            <View className={sectionGap}>
              <H3 className="text-base font-semibold tracking-tight text-foreground">
                Incoming Reports
              </H3>
              <Card className="border-border/50 shadow-sm">
                <CardContent className="gap-4 p-5">
                  <View className="flex-row items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full shrink-0" />
                    <View className="flex-1 gap-2 min-w-0">
                      <Skeleton className="h-4 w-[60%]" />
                      <Skeleton className="h-3 w-[40%]" />
                    </View>
                  </View>
                  <View className="flex-row items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full shrink-0" />
                    <View className="flex-1 gap-2 min-w-0">
                      <Skeleton className="h-4 w-[70%]" />
                      <Skeleton className="h-3 w-[30%]" />
                    </View>
                  </View>
                </CardContent>
              </Card>
            </View>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <Text className="text-sm font-medium text-foreground">System Health Details</Text>
                </AccordionTrigger>
                <AccordionContent>
                  <P className="text-muted-foreground text-sm leading-relaxed">
                    All core systems are operational. No critical failures detected in the last 24
                    hours. Backup systems are currently being verified.
                  </P>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <Text className="text-sm font-medium text-foreground">Accessibility Scorecard</Text>
                </AccordionTrigger>
                <AccordionContent>
                  <P className="text-muted-foreground text-sm leading-relaxed">
                    Current accessibility score: 98/100. We identified minor color contrast issues
                    on secondary buttons in dark mode which are being addressed in the next release.
                  </P>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quick Settings</CardTitle>
                <CardDescription className="mt-0.5">
                  Workspace preferences at a glance.
                </CardDescription>
              </CardHeader>
              <CardContent className="gap-5 pt-2">
                <View className="flex-row items-center justify-between gap-4">
                  <View className="flex-1 min-w-0">
                    <Label className="text-sm font-medium text-foreground">
                      Push Notifications
                    </Label>
                    <Text variant="muted" className="text-xs mt-0.5">
                      Instant alerts for system changes.
                    </Text>
                  </View>
                  <Switch
                    checked={isNotificationsEnabled}
                    onCheckedChange={setIsNotificationsEnabled}
                    className="shrink-0"
                  />
                </View>
                <Separator className="bg-border/60" />
                <View className="flex-row items-center justify-between gap-4">
                  <View className="flex-1 min-w-0">
                    <Label className="text-sm font-medium text-foreground">Beta Access</Label>
                    <Text variant="muted" className="text-xs mt-0.5">
                      Try experimental UI components.
                    </Text>
                  </View>
                  <Badge variant="secondary" className="shrink-0">Active</Badge>
                </View>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Team Availability</CardTitle>
                <CardDescription className="mt-0.5">
                  Design and engineering coverage.
                </CardDescription>
              </CardHeader>
              <CardContent className="gap-4 pt-2">
                {[
                  { name: 'Evelyn Ward', role: 'Product Design', status: 'Online' },
                  { name: 'Marco Lee', role: 'Frontend', status: 'In a meeting' },
                  { name: 'Ava Patel', role: 'Research', status: 'Focus time' },
                ].map((member) => (
                  <View key={member.name} className="flex-row items-center gap-3">
                    <Avatar size="default" className="border-border border shrink-0">
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <View className="flex-1 min-w-0">
                      <Text className="text-sm font-medium text-foreground">{member.name}</Text>
                      <Text className="text-muted-foreground text-xs mt-0.5">{member.role}</Text>
                    </View>
                    <Badge variant="secondary" className="shrink-0">{member.status}</Badge>
                  </View>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Generate Report Button — consistent horizontal padding, clear section separation */}
        <View className={`${contentPadding} pt-8 pb-16`}>
          <Button size="lg" className="w-full">
            <LayoutDashboard size={20} className="text-primary-foreground mr-2.5 shrink-0" />
            <Text className="text-primary-foreground text-base font-semibold">
              Generate Monthly Report
            </Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 32,
  },
});
