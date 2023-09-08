import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
} from "react-native";

import style from "./style";
import { FlashCardView } from "../FlashCardView";
import { MCQView } from "../MCQView";

import { ButtonIcons, UserAccountButton } from "@/components/general";
import { Content, ContentView, FlashCard, MCQ } from "@/data/";
import { useAppColorProfile } from "@/hooks/colorHooks";

interface ContentCardProps {
  content: Content;
}

interface ContentCardViewProps {
  content: ContentView;
  index: number;
}

interface WrapperContentViewProps {
  url: undefined | string;
  children: JSX.Element;
}

interface ContentIconsButtonProps {
  id: string;
  text: string;
  icon: keyof typeof Ionicons.glyphMap;
}

export const ContentCardView: React.FC<ContentCardViewProps> = ({
  content,
  index,
}) => {
  if (content.loading === "loading") {
    return (
      <View style={style.container}>
        <ActivityIndicator />
      </View>
    );
  }
  return <ContentCard content={content} />;
};

const icons: ContentIconsButtonProps[] = [
  { id: "like", text: "20", icon: "heart" },
  { id: "comment", text: "20", icon: "chatbubble-ellipses" },
  { id: "bookmark", text: "20", icon: "bookmark" },
  { id: "forward", text: "20", icon: "arrow-redo" },
];

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const colorPallet = useAppColorProfile();
  const colorSyle = useMemo(
    () =>
      StyleSheet.create({
        playListBackground: { backgroundColor: colorPallet.background_color },
        text: { color: colorPallet.text_color },
      }),
    [colorPallet],
  );

  let renderContent = <Text>Undefined Content Type</Text>;
  let url: string | undefined = undefined;

  if (content.type === "flashcard") {
    renderContent = <FlashCardView flashcard={content as FlashCard} />;
  } else if (content.type === "mcq") {
    renderContent = <MCQView mcq={content as MCQ} />;
    url = (content as MCQ).image;
  }
  return (
    <WrapperContent url={url}>
      <View style={style.container}>
        <View style={style.contentWrapper}>
          <View style={style.content}>
            <View style={style.content}>{renderContent}</View>
            <View style={style.bottomFooter}>
              <Text style={colorSyle.text}>{content.user?.name}</Text>
              <Text style={colorSyle.text}>{content.description}</Text>
            </View>
          </View>
          <View style={style.rightBarWrapper}>
            <View style={style.rightIconBar}>
              <UserAccountButton uri={content.user?.avatar ?? ""} />
              {icons.map((icon) => (
                <ButtonIcons icon={icon.icon} label={icon.text} key={icon.id} />
              ))}
            </View>
          </View>
        </View>

        <View style={[style.playlist, colorSyle.playListBackground]}>
          <Text style={colorSyle.text}>{content.playlist}</Text>
        </View>
      </View>
    </WrapperContent>
  );
};

const WrapperContent: React.FC<WrapperContentViewProps> = ({
  url,
  children,
}) => {
  const colorPallet = useAppColorProfile();
  const overlayStyle = useMemo(
    () =>
      StyleSheet.create({
        overlayBackground: { backgroundColor: colorPallet.background_color },
      }),
    [colorPallet],
  );
  if (url === undefined) {
    return (
      <LinearGradient
        colors={["darkblue", "black"]}
        style={style.wrapperContainer}
      >
        {children}
      </LinearGradient>
    );
  }
  return (
    <ImageBackground style={style.wrapperContainer} source={{ uri: url }}>
      <View style={[style.overlay, overlayStyle.overlayBackground]} />
      <View style={style.content}>{children}</View>
    </ImageBackground>
  );
};
