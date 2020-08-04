import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, Button, Alert, PanResponder } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import { comments } from '../redux/comments';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites,
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

function RenderDish(props) {

    const dish = props.dish;

    handleViewRef = ref => this.view = ref;

    const recognizeDrag = ({moveX, moveY, dx, dy}) => {
        if( dx < -200 )
            return true;
        else
            return false;
        
    };

    const panResponder =PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {this.view.rubberBand(1000)
            .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel pressed'),
                            style: 'cancel'
                        },
                        {
                            text: 'OK',
                            onPress: () =>  props.favorite ? console.log('already favourite') : props.onPress()
                        }
                    ],
                    { cancelable: false}
                )
            return true;
        }
    });

    if(dish !=null) {
        return(
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000}
                ref={this.handleViewRef}
                {...panResponder.panHandlers}>
                <Card
                    featuredTitle={dish.name}
                    image={{ uri: baseUrl + dish.image}}
                    >
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Icon 
                            raised
                            reverse
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('already favourite') : props.onPress()}
                            />
                        <Icon 
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color='#512DA8'
                            onPress={() => props.toggleModal()}
                            />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    else {
        return(<View></View>)
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'--' + item.author + ',' + item.date}</Text>
            </View>
        );

    }

    return(
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000}>
            <Card title='comments'>
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}

class DishDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rating: 0,
            author: '',
            comment: '',
            showModal: false
        }
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    handleSubmit(dishId) {
        const id = comments.length;
        console.log(JSON.stringify(this.state));
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment)
        this.toggleModal();
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    render() {

        const dishId = this.props.route.params.dishId;

        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                            favorite={this.props.favorites.some(el => el === dishId)}                 
                            toggleModal={() => this.toggleModal()}
                            onPress={() => this.markFavorite(dishId)} 
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal
                    animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }
                    >
                    <View style={styles.modalContainer}>
                        <Rating style={styles.formRating}
                            type='star'
                            ratingCount={5}
                            imageSize={60}
                            showRating
                            startingValue={0}
                            onFinishRating={(value) => this.setState({ rating: value})}
                        />
                        <Input style={styles.formRow}
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user' }}
                            onChangeText={value => this.setState({ author: value })}
                            />
                        <Input style={styles.formRow}
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comments' }}
                            onChangeText={value => this.setState({ comment: value })}
                            />
                        <View style={{margin: 10}}>
                            <Button
                                title='SUBMIT'
                                color='#512DA8'
                                onPress={() => this.handleSubmit(dishId)}
                                />
                        </View>
                        <View style={{ margin: 10}}>
                            <Button 
                                title='CANCEL'
                                color='#512DA8'
                                onPress={() => this.toggleModal()}
                                accessibilityLabel='learn more about this'
                                />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    
    modalContainer: {
        margin: 20,
        justifyContent: "center",
        textAlign: 'center',
        flexDirection: 'column'
    },
    formRating: {
        margin: 30,
    },
    formButton: {
        margin: 20
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);