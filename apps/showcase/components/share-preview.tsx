import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  Label,
} from '@novaui/components';
import { Facebook, Instagram, LinkIcon, Twitter } from 'lucide-react-native';
import { Image, TouchableOpacity, View } from 'react-native';
// Share Preview Component
const SharePreview = ({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) => {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const iconColor = Colors[theme].icon;
  return (
    <DrawerContent className="px-4 pb-8">
      <DrawerHeader className="px-0 pb-6 pt-4">
        <DrawerTitle className="text-center text-xl font-semibold">Share Audiobook</DrawerTitle>
        <DrawerDescription className="mt-2 text-center text-base">
          Choose how you want to share.
        </DrawerDescription>
      </DrawerHeader>

      <Item variant="outline" className="border-border/50 bg-secondary/20 mb-6 rounded-2xl p-4">
        <ItemMedia variant="image" className="h-14 w-14 overflow-hidden rounded-xl">
          <Image source={{ uri: image }} className="h-full w-full object-cover" />
        </ItemMedia>
        <ItemContent className="ml-4 justify-center">
          <ItemTitle className="text-lg font-bold">{title}</ItemTitle>
          <ItemDescription className="text-muted-foreground mt-0.5 text-base">
            {description}
          </ItemDescription>
        </ItemContent>
      </Item>

      <View className="mb-4 flex-row items-center justify-around px-2">
        <TouchableOpacity activeOpacity={0.8} className="items-center gap-2">
          <View className="h-14 w-14 items-center justify-center rounded-full bg-[#1877F2]/10">
            <Facebook size={24} color="#1877F2" />
          </View>
          <Label className="text-muted-foreground text-xs">Facebook</Label>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} className="items-center gap-2">
          <View className="bg-foreground/5 h-14 w-14 items-center justify-center rounded-full">
            <Twitter size={22} color={iconColor} />
          </View>
          <Label className="text-muted-foreground text-xs">X</Label>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} className="items-center gap-2">
          <View className="h-14 w-14 items-center justify-center rounded-full bg-[#E1306C]/10">
            <Instagram size={24} color="#E1306C" />
          </View>
          <Label className="text-muted-foreground text-xs">Instagram</Label>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} className="items-center gap-2">
          <View className="bg-foreground/5 h-14 w-14 items-center justify-center rounded-full">
            <LinkIcon size={24} color={iconColor} />
          </View>
          <Label className="text-muted-foreground text-xs">Copy Link</Label>
        </TouchableOpacity>
      </View>
    </DrawerContent>
  );
};

export default SharePreview;
