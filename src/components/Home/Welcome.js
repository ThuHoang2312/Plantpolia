import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {VictoryPie} from 'victory-native';
import {MainContext} from '../../contexts/MainContext';
import {colors} from '../../utils/colors';
import {fontFamily, fontSizes, spacing} from '../../utils/sizes';
import {StatisticCard} from '../StatisticCard';

const Welcome = ({dehydratedUserPlants, hydratedUserPlants}) => {
  const {user} = useContext(MainContext);
  const data = [
    {
      x: 'Hydrated Plants',
      y: hydratedUserPlants.length,
    },
    {
      x: 'Dehydrated Plants',
      y: dehydratedUserPlants.length,
    },
  ];

  return (
    <>
      <View style={styles.container}>
        <View style={styles.pieContainer}>
          <VictoryPie
            data={data}
            width={150}
            height={150}
            innerRadius={50}
            colorScale={[colors.dehydrated, colors.hydrated]}
            labelRadius={({innerRadius}) => innerRadius + 5}
            style={{
              labels: {
                fill: colors.background,
                fontSize: 20,
                fontWeight: 'bold',
              },
            }}
          />
        </View>
        <View style={styles.welcome}>
          <Text style={styles.title}>Welcome {user.full_name}!</Text>
        </View>
      </View>
      <View style={styles.statisticContainer}>
        <StatisticCard number={hydratedUserPlants.length} isHydrated={true} />
        <StatisticCard
          number={dehydratedUserPlants.length}
          isHydrated={false}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pieContainer: {
    justifyContent: 'center',
    marginHorizontal: spacing.md,
  },
  welcome: {
    justifyContent: 'center',
    marginHorizontal: spacing.md,
  },
  title: {
    fontFamily: fontFamily.regular,
    color: colors.primary800,
    fontSize: fontSizes.lg,
    textAlign: 'center',
  },
  statisticContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

Welcome.propTypes = {
  hydratedUserPlants: PropTypes.array,
  dehydratedUserPlants: PropTypes.array,
};
export default Welcome;
