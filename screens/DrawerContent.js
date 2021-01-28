import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { logout } from '../redux/actions'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    authReducer: state.authReducer,
    currentUser: state.authReducer.currentUser
})

const _DrawerContent = (props) => {

    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style= {styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            <Avatar.Image 
                            source={{
                                uri: props.currentUser ? props.currentUser.img_url : ""
                            }}
                            size={50}
                            />
                            <View style={{flexDirection: 'column', marginLeft:15}}>
                                <Title style={styles.title}>
                                {props.currentUser ? props.currentUser.first_name + " " + props.currentUser.last_name : null}
                               </Title>
                               <Caption style={styles.caption}>
                                   {props.currentUser ? `#${props.currentUser.username}` : null}
                               </Caption>
                            </View>
                        </View>
                    </View>

                    {/* <View style={styles.row}>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>
                                Number
                            </Paragraph>
                            <Caption style={styles.caption}>
                                thing
                            </Caption>
                        </View>
                    </View> */}

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                name="home-outline"
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                         <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                name="cog-outline"
                                color={color}
                                size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => {props.navigation.navigate('Settings')}}
                        />
                         <DrawerItem
                            icon={({color, size}) => (
                                <Icon
                                name="account-outline"
                                color={color}
                                size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />
                    </Drawer.Section>
                    {/* Do when state added */}
                    <Drawer.Section title="Modes">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>
                                    Dark Theme
                                </Text>
                                {/* <View pointerEvents="none">
                                    <Switch value={something}/>
                                </View> */}
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>

            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                icon={({color, size}) => (
                    <Icon
                    name="exit-to-app"
                    color={color}
                    size={size}
                    />
                )}
                label="Sign Out"
                onPress={() => {
                    props.logout()
                    // props.navigation.reset()
                }}
                />
            </Drawer.Section>
        </View>
    )
}

const DrawerContent = connect(mapStateToProps, { logout })(_DrawerContent)

export default DrawerContent;

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });