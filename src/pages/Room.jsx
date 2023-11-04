/* eslint-disable no-useless-escape */
import { useState, useEffect } from "react";
import { Trash2 } from "react-feather";
import { ID, Query, Role, Permission } from "appwrite";
import { appwriteConfig, database, client } from "../appwrite/config";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";


const { databaseID, messagesCollectionID } = appwriteConfig;

const Room = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [messageBody, setMessageBody] = useState('');

    const getMessages = async () => {
        try {
            const response = await database.listDocuments(
                databaseID,
                messagesCollectionID,
                [
                    Query.orderDesc('$createdAt'),
                    Query.limit(20)
                ]
            )
            console.log('Response:', response);
            setMessages(response.documents);
        } catch (error) {
            console.log(error);
            throw Error;
        }
    }

    useEffect(() => {
        /** get data */
        getMessages();

        /** subscribe to multiple channels with appwrite */
        const unsubscribe = client.subscribe(`databases.${databaseID}.collections.${messagesCollectionID}.documents`, (response) => {
            console.log('subscription response', response);
            if (response.events.includes("databases.*.collections.*.documents.*.create")) {
                console.log('New message created');
                setMessages((values) => [response.payload, ...values])
            }
            if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
                console.log('message deleted')
                setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id))
            }
        });

        /** unsubscribe from appwrite */
        return () => {
            unsubscribe();
        }
    }, [])


    const handleSubmit = async (event) => {
        event.preventDefault()

        let payload = {
            user_id: user.$id,
            username: user.name,
            body: messageBody
        }

        let permissions = [
           Permission.write(Role.user(user.$id)) 
        ]

        const response = await database.createDocument(
            databaseID,
            messagesCollectionID,
            ID.unique(),
            payload,
            permissions
        );

        console.log('Message Created!', response)
        // setMessages((prevState)=> [response, ...prevState])

        setMessageBody('');
    }

    const handleDelete = async (messageId) => {
        try {
            await database.deleteDocument(
                databaseID,
                messagesCollectionID,
                messageId
            );
            console.log(true, 'Message deleted!');
            //setMessages(messages.filter(message => message.$id !== messageId))
        } catch (error) {
            console.log('error while deleting', error);
            throw Error;
        }
    }

    return (
        <main className="container">
            <Header />
            <div className="room--container">
                <form onSubmit={handleSubmit} id="message--form">
                    <div>
                        <textarea name="" id="" cols="20" rows="7"
                            maxLength={2000}
                            placeholder="Write a message..."
                            required
                            value={messageBody}
                            onChange={(e)=> setMessageBody(e.target.value)}
                        />
                    </div>
                    <div className="send-btn--wrapper">
                        <input className="btn btn--wrapper" type="submit" value="Send" />
                    </div>
                </form>
                <div className="scroll">
                    {messages.map(message => (
                        <div className="message--wrapper" key={message.$id}>

                            <div className="message--header">
                                <p>
                                    {message?.username ? (
                                        <span>{message.username}</span>
                                    ) : (
                                            <span>Anonymous user</span>
                                    )}
                                <small className="message-timestamp">{new Date(message.$createdAt).toLocaleString()}</small>
                                </p>
                                {message.$permissions.includes(`delete(\"user:${user.$id}\")`) && (
                                    <Trash2
                                        className="delete--btn"
                                        onClick={()=> {handleDelete(message.$id)}}
                                    /> 
                                )}
                            </div>
                            <div className="message--body">
                                <span>{message.body}</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </main>
    )
}


export default Room;