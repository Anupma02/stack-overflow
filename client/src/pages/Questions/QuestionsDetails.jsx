import React , { useState }from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { useParams ,Link, useNavigate , useLocation } from 'react-router-dom'
import moment from "moment"
import copy from "copy-to-clipboard"

import upVote from '../../assets/upVote.svg'
import downVote from '../../assets/downVote.svg'
import './Questions.css'
import Avatar from '../../components/Avatar/Avatar'
import './DisplayAnswer.jsx'
import DisplayAnswer from './DisplayAnswer.jsx'
import {postAnswer , deleteQuestion , voteQuestion} from "../../actions/question.js"

const QuestionsDetails = () => {

    const { id } = useParams()
    const questionsList = useSelector( state => state.questionReducer)

    // var questionsList = [{
    //     _id: '1',
    //     upVotes: 3,
    //     downVotes :2,
    //     noOfAnswers: 2,
    //     questionTitle: "What is a function?",
    //     questionBody : "It meant to be",
    //     questionTags : ["java","node js","react js","mongodb"],
    //     userPosted : "mano",
    //     askedOn : "jan1",
    //     userId : 2,
    //     answer: [{
    //       answerBody : "Answer",
    //       userAnswered : "kumar",
    //       answeredOn : "jan 2",
    //       userId : 2,
    //     }]
    //   },
    //   {
    //     _id: '2',
    //     upVotes: 3,
    //     downVotes :2,
    //     noOfAnswers: 0,
    //     questionTitle: "What is a function?",
    //     questionBody : "It meant to be",
    //     questionTags : ["javascript","R","python"],
    //     userPosted : "mano",
    //     askedOn : "jan1",
    //     userId : 2,
    //     answer: [{
    //       answerBody : "Answer",
    //       userAnswered : "kumar",
    //       answeredOn : "jan 2",
    //       userId : 2,
    //     }]
    //   },
    //   {
    //     _id: '3',
    //     upVotes: 3,
    //     downVotes :2,
    //     noOfAnswers: 0,
    //     questionTitle: "What is a function?",
    //     questionBody : "It meant to be",
    //     questionTags : ["javascript","R","python"],
    //     userPosted : "mano",
    //     askedOn : "jan1",
    //     userId : 2,
    //     answer: [{
    //       answerBody : "Answer",
    //       userAnswered : "kumar",
    //       answeredOn : "jan 2",
    //       userId : 2,
    //     }]
    //   }]
    

    const [Answer , setAnswer] = useState("")
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const User = useSelector((state) => (state.currentUserReducer))
    const location = useLocation()
    const url = "https://stackoverflow-anupma.netlify.app"


    const handlePostAns = (e , answerLength ) =>{
        e.preventDefault()
        if(User === null){
            alert('Login or signup to answer a question')
            Navigate('/Auth')
        }else{
            if(Answer === ''){
                alert("Enter an answer before submitting")
            }else{
                dispatch(postAnswer({id, noOfAnswers : answerLength + 1 ,answerBody : Answer , userAnswered : User.result.name , userId: User.result._id }))
            }
        }
    }


    const handleShare = () =>{
        copy(url+location.pathname)
        alert("Copied url : "  +url+location.pathname)
    }

    const handleDelete = () => {
        dispatch(deleteQuestion(id , Navigate))
    }

    const handleUpVote = () => {
        dispatch(voteQuestion(id,'upVote' , User.result._id))
    }

    const handleDownVote = () => {
        dispatch(voteQuestion(id,'downVote' , User.result._id))
    }

  return (
    <div className='question-details-page'>
        {
            questionsList.data === null ? 
            <h1>Loading...</h1> :
            <>
                {
                    questionsList.data.filter(question => question._id === id).map(question => (
                        <div key={question._id}>
                            {console.log(question)}
                            <section className='question-details-container'>
                                <h1>{question.questionTitle}</h1>
                                <div className='question-details-container-2'>
                                    <div className="question-votes">
                                        <img src={upVote} alt="upVote" width ="18" className='votes-icon' onClick={handleUpVote}/>
                                        <p>{question.upVote.length - question.downVote.length}</p>
                                        <img src={downVote} alt="downVote" width ="18" className='votes-icon' onClick={handleDownVote}/>
                                    </div>
                                    <div style={{width : "100%"}}>
                                        <p className='question-body'>{question.questionBody}</p>
                                        <div className="question-details-tags">
                                            {
                                                question.questionTags.map((tag) =>(
                                                    <p key={tag}>{tag}</p>
                                                ))
                                            }
                                        </div>
                                        <div className="question-actions-user">
                                            <div>
                                                <button type='button' onClick={handleShare}>Share</button>
                                                {
                                                    User?.result?._id === question?.userId && (
                                                        <button type='button' onClick={handleDelete}>Delete</button>
                                                    )
                                                }
                                                
                                            </div>
                                            <div>
                                                <p>asked {moment(question.askedOn).fromNow()}</p>
                                                <Link to={`/Users/${question.userId}`} className='user-link' style={{color :"#0086d8"}} >
                                                    <Avatar backgroundColor="orange" px= "15px" py="5px">{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                    <div>
                                                        {question.userPosted}
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                           {
                            question.noOfAnswers !== 0 && (
                                <section>
                                    <h3>{question.noOfAnswers} Answers</h3>
                                    <DisplayAnswer key={question._id} question ={question} handleShare = {handleShare} />
                                </section>
                            )
                           }
 
                           <section className='post-ans-container'>
                                <h3>Your Answer</h3>
                                <form onSubmit={ (e) => { handlePostAns(e , question.answer.length) }}>
                                    <textarea name="" id="" cols="30" rows="10" onChange={ e => setAnswer(e.target.value)}></textarea><br />
                                    <input type='submit' className='post-ans-btn' value="Post Your Answer" />
                                </form>
                                <p>
                                    Browse other Question tagged
                                    {
                                        question.questionTags.map((tag) =>(
                                            <Link to='/Tags' key={tag} className='ans-tag'> {tag} </Link>
                                        ) 
                                        )
                                    } 
                                    or
                                    <Link to='/AskQuestion' style={{textDecoration : "none" , color :"#009dff"}}> ask your own question</Link>
                                </p>
                           </section>
                        </div>
                    ))
                }
            </>
        }
    </div>
  )
}

export default QuestionsDetails
