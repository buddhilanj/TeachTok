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

import { FlashCardView } from "@/components/feed/FlashCardView";
import { MCQView } from "@/components/feed/MCQView";
import { Content, ContentView, isContentFlashCard, isContentMCQ } from "@/data";
import { useAppColorProfile } from "@/hooks/colorHooks";
import RightSideBar from "../RightSideBar";

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

export const ContentCardView: React.FC<ContentCardViewProps> = ({
  content,
}) => {
  if (content.content === null || content.loading === "loading") {
    return (
      <View style={style.container}>
        <ActivityIndicator />
      </View>
    );
  }
  return <ContentCard content={content.content} />;
};


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

  if (isContentFlashCard(content)) {
    renderContent = <FlashCardView flashcard={content} />;
  } else if (isContentMCQ(content)) {
    renderContent = <MCQView mcq={content} />;
    url = content.image;
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
          <RightSideBar userImageURI={content.user.avatar}/>
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
