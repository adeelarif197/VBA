import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { container, headings, primaryColor, Colors, white } from '../utils/Styles';
import IconHeader from '../reuseables/IconHeader';
import languages from '../assets/languages/English.json';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { InputField } from '../reuseables/InputField';
import Btn1 from '../reuseables/Btn1';
import Mycheckbox from '../reuseables/Mycheckbox';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


const myref = React.createRef();
const myref1 = React.createRef();

export default class Registration extends Component {
	state = {
		firstname: '',
		lastname: '',
		Pass: '',
		confirmPassword: '',
		showPassword: true,
		password: '',
		email: '',
		Text: '',
		isSubmitting: false,
		isPolicyChecked: false
	};

	PostDataToFirebase = () => {
		firestore().collection('Users').add({
			firstname: this.state.firstname,
			lastname: this.state.lastname,
			email: this.state.email,
			password: this.state.Pass,
			cpassword: this.state.confirmPassword,
			
		});

		this.props.navigation.replace('Services');
		alert('SignUp Successfully');
	};

	signUpValidation = () => {
		const { email, Pass } = this.state;
		if (email == '' || Pass == '') {
			alert('All fields are required');
			return;
		} else if (email != '' && email.includes('@gmail.com') && Pass != '') {
			this.PostDataToFirebase();
		} else {
			// } else if (Pass ){
			//   alert('password lenght must be 8 charaters long');
			//   return;
			// }
			// else if (Pass.length <= 8 ) {
			//   alert('password lenght must be 8 charaters long');
			//   return;
			// }
			alert('Not a valid email');
			return;
		}
	};

	toggleSecure = (ref) => {
		ref.current.toggleSecure();
	};

	render() {
		const { isSubmitting, isPolicyChecked } = this.state;
		return (
			<View style={container.empty}>
				<IconHeader
					onleftPress={() => {
						this.props.navigation.goBack();
					}}
					leftBtn={
						<AntDesign size={25} name="arrowleft" color={primaryColor} style={{ left: 20, top: 20 }} />
					}
				/>
				<ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
					<View style={{ alignItems: 'center', marginVertical: 5 }}>
						<Text style={{ ...headings.h1s, color: primaryColor }}>{languages.register}</Text>
					</View>

					<View>
						<InputField
							lable={languages.firstname}
							icon={<Feather name="user" size={20} color={Colors.gray} />}
							value={this.state.firstname}
							onChange={(txt) => {
								this.setState({ firstname: txt });
							}}
						/>
						<InputField
							lable={languages.lastname}
							icon={<Feather name="user" size={20} color={Colors.gray} />}
							value={this.state.lastname}
							onChange={(txt) => {
								this.setState({ lastname: txt });
							}}
						/>

						<InputField
							keyboardType="email-address"
							lable="Email Address"
							icon={<Fontisto name="email" size={20} color={Colors.gray} />}
							value={this.state.email}
							onChange={(txt) => {
								this.setState({ email: txt });
							}}
						/>

						{/* <InputField keyboardType="phone-pad" ref={myref} oniconPress={this.toggleSecure} lable="Phone Number" icon={<AntDesign name="phone" size={20} color={Colors.gray} />} /> */}

						<InputField
							ref={myref1}
							oniconPress={() => this.toggleSecure(myref1)}
							isSecure={true}
							lable="Password"
							icon={<Feather name="lock" size={20} color={Colors.gray} />}
							value={this.state.Pass}
							onChange={(txt) => {
								this.setState({ Pass: txt });
							}}
						/>

						<InputField
							isSecure={true}
							ref={myref}
							oniconPress={() => this.toggleSecure(myref)}
							lable="Confirm Password"
							icon={<Feather name="lock" size={20} color={Colors.gray} />}
							value={this.state.confirmPassword}
							onChange={(txt) => {
								this.setState({ confirmPassword: txt });
							}}
						/>

						<View style={{ marginHorizontal: 35 }}>
							<Mycheckbox
								onPress={(val) => {
									this.setState({ isPolicyChecked: !isPolicyChecked });
								}}
								text={languages.iagreeterms}
							/>
						</View>

						<View style={{ marginBottom: 20, marginTop: 30 }}>
							<Btn1
								lableStyle={{ ...headings.h6M, color: white }}
								lable={languages.register}
								onPress={() => {
									this.signUpValidation()
								}}
							/>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}
