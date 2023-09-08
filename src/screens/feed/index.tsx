import { useRoute } from "@react-navigation/native";
import React, { useCallback } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ContentCardView } from "@/components/feed/ContentCardView";
import { ContentView } from "@/data";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { TAB_FOLLOWING, TAB_FOR_YOU } from "@/navigation/feed/Tabs";
import { getNextFollowing } from "@/slices/followingFeed";
import { getNextForYou } from "@/slices/forYouFeed";

interface RowItemProps {
  item: ContentView;
  index: number;
}
const FeedScreen = () => {
  const dispatch = useAppDispatch();
  const { name: routeName } = useRoute();
  const feed = useAppSelector((state) =>
    routeName === TAB_FOLLOWING ? state.following.feed : state.forYou.feed,
  );

  const renderFeedItem = ({ item, index }: RowItemProps) => {
    return <ContentCardView content={item} index={index} />;
  };

  const getNextItem = useCallback(() => {
    if (routeName === TAB_FOLLOWING) {
      dispatch(getNextFollowing());
    } else if (routeName === TAB_FOR_YOU) {
      dispatch(getNextForYou());
    }
  }, [routeName, dispatch]);

  return (
    <SafeAreaView>
      <FlatList
        data={feed}
        renderItem={renderFeedItem}
        pagingEnabled
        decelerationRate="fast"
        keyExtractor={(item) => item.requestId}
        onEndReached={getNextItem}
        onEndReachedThreshold={1}
      />
    </SafeAreaView>
  );
};

export default FeedScreen;
