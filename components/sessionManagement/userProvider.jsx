import React, { createContext, Component } from 'react';
import { View } from 'react-native';
import { auth, generateUserDocument, logoutUpdateUserDocument } from './firebase';

export const UserContext = createContext({user: null, sessionToken: ''});

let localSession = undefined;
 class UserProvider extends Component {
    constructor(props) {
        super(props);
        this.state = ({userContext: {user: null, sessionToken: ''}});
        localSession = localStorage.getItem("session");
       
        console.log('userProvider : State constructeur : ');
    }

    componentDidMount = async () => {
        
        auth.onAuthStateChanged(async (userAuth) => {
            if(userAuth) {
                let remoteStored = 0;
                let token = await userAuth.getIdToken();
                let sessionParam = null;
                if(!localSession) {
                     localSession = userAuth.uid + '!' + token + '!' + remoteStored;
                     sessionParam = localSession.split('!');
                } else {
                     sessionParam = localSession.split('!');
                    if(!this.sameSession(sessionParam[1], token)) {
                        localSession = userAuth.uid + '!' + token + '!' + remoteStored;
                        console.log('UserProvider : onAuthStateChanged : New user session : ');
                    }
                }
                localStorage.setItem('session', localSession);
                console.log('userProvider : onAuthStateChanged 1: ');
                const user = await generateUserDocument(userAuth, sessionParam[1]);
                this.setState({ userContext: { user: user, sessionToken: localSession }});  ²
                console.log('UserProvider : setItem : ' + user.uid + ' : ');
            } else {
                const localSession =localStorage.getItem('session');
                let sessionParam = localSession.split('!');
                await logoutUpdateUserDocument(sessionParam[0], sessionParam[1]);
                localStorage.setItem('session', '');
                console.log('UserProvider : No user connected : ');
                this.setState({ userContext: { user: null, sessionToken: '' } });
            }
            });
    }

    sameSession(token1, token2) {
        if(token1 === token2) return true;
        // console.log('UserProvider : SameSession false');
        // console.log('UserProvider : SameSession false : token1 :   ' + token1);
        // console.log('UserProvider : SameSession false : token2 :   ' + token2);
        return false;
    }

    render() {
        return(
            <View>
                <UserContext.Provider value={this.state.userContext} >
                {this.props.children}
                </UserContext.Provider>
            </View>
        );
    }
}
export default UserProvider;