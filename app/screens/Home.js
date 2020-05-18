import React from 'react';
import {StyleSheet, Dimensions, ScrollView, Image} from 'react-native';
import {Block, theme, Text} from 'galio-framework';

import {useCamera} from '../context/camera';

const {width} = Dimensions.get('screen');
const cardWidth = width - theme.SIZES.BASE * 2;

export default function Home() {
  const {captures} = useCamera();

  return (
    <Block flex center>
      <ScrollView>
        {captures
          .filter(img => img.type === 'photo')
          .map((item, index) => (
            <ScrollView key={index} showsVerticalScrollIndicator={false}>
              <Block flex style={styles.group}>
                <Block flex>
                  <Block flex style={{marginTop: theme.SIZES.BASE / 2}}>
                    <ScrollView
                      horizontal
                      pagingEnabled
                      decelerationRate={0}
                      scrollEventThrottle={16}
                      snapToAlignment="center"
                      showsHorizontalScrollIndicator={false}
                      snapToInterval={cardWidth + theme.SIZES.BASE * 0.375}
                      contentContainerStyle={{
                        paddingHorizontal: theme.SIZES.BASE / 2,
                      }}
                    >
                      <Block center style={styles.item}>
                        <Image
                          resizeMode="cover"
                          style={styles.image}
                          source={item.image}
                        />
                      </Block>
                      <Block flex>
                        {item.classifiers.map((cfier, i) => {
                          return (
                            <Block key={`${i}-${index}`}>
                              <Text>Class: {cfier.class}</Text>
                              <Text>Score: {cfier.score}</Text>
                            </Block>
                          );
                        })}
                      </Block>
                    </ScrollView>
                  </Block>
                </Block>
              </Block>
            </ScrollView>
          ))}
      </ScrollView>
    </Block>
  );
}

const styles = StyleSheet.create({
  group: {
    paddingTop: theme.SIZES.BASE,
  },
  item: {
    width: cardWidth - theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 7},
    shadowRadius: 10,
    shadowOpacity: 0.2,
  },
  image: {
    width: cardWidth - theme.SIZES.BASE,
    height: cardWidth - theme.SIZES.BASE,
    borderRadius: 3,
  },
});
