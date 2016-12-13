// var data = [
//   {author: 'Zoe Washburn', points: 45, body: 'This is one comment.'},
//   {author: 'Willow Rosenberg', points: 102, body: 'This is *another* comment.'},
//   {author: 'Martha Jones', points: 88, body: 'My comment is here.'},
//   {author: 'Kelly Murray', points: 450, body: 'JavaScript is your friend!'}
// ]
//unclear if this data array can be named something else. I tried assigning the variable a more meaningful name but found it difficult to plug in the variable name correctly.

var CommentBox = React.createClass({
  getInitialState: function() {
   return {data: []};
  },
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm/>
      </div>
    );
  }
});

//wondering what order these are listed in affects how they are recognized... like variable scope or function hoisting?
//ok I moved CommentBox below CommentList and CommentForm, and the page seemed to be exactly the same

//the first parameter accepted by ReactDOM.render() is the element, the second is the HTML element where it will be hooked in
// this render method injects the markup (first argument) into a raw DOM element (second element)

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author}>
          <div>{comment.body}</div>
          <div className='score'>This comment has {comment.points} points.</div>
        </Comment>
      );
    });

    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

//this creates the comment component. without it, the comments listed in the CommentList won't mean anything. React won't know what a comment is. We must teach it.
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});
//if I remove {this.props.children}, the comment body markdown does not render on the page.

// "Data passed in from a parent component is available as a 'property' on the child component. These 'properties' are accessed through this.props"

//remember class is a reserved word in JS... so HTML elements get a class according to className

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox url="http://localhost:3004/db" pollInterval={2000}/>,
  document.getElementById('comments')
);

// "It is important that ReactDOM.render remain at the bottom of the script for this tutorial. ReactDOM.render should only be called after the composite components have been defined."

// "The <div> tags are not actual DOM nodes; they are instantiations of React div components."
