import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {VictoryPie} from 'victory-native';
import {MainContext} from '../../contexts/MainContext';
import {colors} from '../../utils/colors';
import {fontFamily, fontSizes, spacing} from '../../utils/sizes';
import {StatisticCard} from '../StatisticCard';
import {safeJsonParse} from '../../utils/safeJsonParse';

const Welcome = ({dehydratedUserPlants, hydratedUserPlants}) => {
  const {user} = useContext(MainContext);
  const userData = safeJsonParse(user.full_name);
  console.log(userData);
  let isData = false;
  if (dehydratedUserPlants.length > 0 || hydratedUserPlants.length > 0) {
    isData = true;
  }
  const data = [
    {
      x: hydratedUserPlants.length,
      y: hydratedUserPlants.length,
    },
    {
      x: dehydratedUserPlants.length,
      y: dehydratedUserPlants.length,
    },
  ];

  return (
    <>
      {isData ? (
        <View>
          <View style={styles.container}>
            <View style={styles.pieContainer}>
              <VictoryPie
                data={data}
                width={150}
                height={150}
                innerRadius={40}
                colorScale={[colors.hydrated, colors.dehydrated]}
                labelRadius={({innerRadius}) => innerRadius + 5}
                style={{
                  labels: {
                    fill: colors.background,
                    fontSize: spacing.md,
                    fontWeight: 'bold',
                  },
                }}
              />
            </View>
            <View style={styles.welcomeContainer}>
              <Text style={styles.title}>Welcome {userData.fullname}</Text>
            </View>
          </View>
          <View style={styles.statisticContainer}>
            <StatisticCard
              number={dehydratedUserPlants.length}
              isHydrated={false}
            />
            <StatisticCard
              number={hydratedUserPlants.length}
              isHydrated={true}
            />
          </View>
        </View>
      ) : (
        <Text style={styles.welcome}>Welcome {userData.fullname}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pieContainer: {
    flex: 1,
    height: 100,
    justifyContent: 'center',
    marginHorizontal: spacing.md,
  },
  welcomeContainer: {
    flex: 3,
    justifyContent: 'center',
    marginHorizontal: spacing.md,
  },
  title: {
    fontFamily: fontFamily.bold,
    color: colors.primary700,
    fontSize: fontSizes.md,
    alignSelf: 'center',
  },
  statisticContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  welcome: {
    textAlign: 'center',
    fontFamily: fontFamily.bold,
    fontSize: fontSizes.lg,
    marginVertical: spacing.md,
    color: colors.primary700,
  },
});

Welcome.propTypes = {
  hydratedUserPlants: PropTypes.array,
  dehydratedUserPlants: PropTypes.array,
};
export default Welcome;
