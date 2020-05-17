import React from 'react';
import {StyleSheet, Dimensions, ScrollView, Image} from 'react-native';
import {Block, Text, theme} from 'galio-framework';

const {width} = Dimensions.get('screen');
const cardWidth = width - theme.SIZES.BASE * 2;

const categories = [
  {
    title: 'Music Album',
    image:
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?fit=crop&w=840&q=80',
  },
  {
    title: 'Events',
    image:
      'https://images.unsplash.com/photo-1543747579-795b9c2c3ada?fit=crop&w=840&q=80',
  },
];

class Home extends React.Component {
  renderProduct = (item, index) => {
    return (
      <Block center style={styles.productItem}>
        <Image
          resizeMode="cover"
          style={styles.productImage}
          source={{uri: item.image}}
        />
        <Block center style={{paddingHorizontal: theme.SIZES.BASE}}>
          <Text style={{paddingTop: theme.SIZES.BASE}} center size={34}>
            {item.title}
          </Text>
        </Block>
      </Block>
    );
  };

  render() {
    return (
      <Block flex center>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block flex style={styles.group}>
            <Block flex>
              <Block flex style={{marginTop: theme.SIZES.BASE / 2}}>
                <ScrollView
                  horizontal={true}
                  pagingEnabled={true}
                  decelerationRate={0}
                  scrollEventThrottle={16}
                  snapToAlignment="center"
                  showsHorizontalScrollIndicator={false}
                  snapToInterval={cardWidth + theme.SIZES.BASE * 0.375}
                  contentContainerStyle={{
                    paddingHorizontal: theme.SIZES.BASE / 2,
                  }}
                >
                  {categories &&
                    categories.map((item, index) =>
                      this.renderProduct(item, index),
                    )}
                </ScrollView>
              </Block>
            </Block>
          </Block>
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  group: {
    paddingTop: theme.SIZES.BASE,
  },
  productItem: {
    width: cardWidth - theme.SIZES.BASE * 2,
    marginHorizontal: theme.SIZES.BASE,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 7},
    shadowRadius: 10,
    shadowOpacity: 0.2,
  },
  productImage: {
    width: cardWidth - theme.SIZES.BASE,
    height: cardWidth - theme.SIZES.BASE,
    borderRadius: 3,
  },
});

export default Home;
