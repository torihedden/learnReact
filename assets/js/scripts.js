var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <h3>Leave your comment below.</h3>
        <CommentList />
        <CommentForm />
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
    return (
      <div className="commentList">
        <Comment author="Zoe Washburn" points='45'>This is one comment</Comment>
        <Comment author="Willow Rosenberg" points='102'>This is *another* comment</Comment>
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
        <div className="points">
          This comment has {this.props.points} points.
        </div>
        {this.props.children}
      </div>
    );
  }
});

//remember class is a reserved word in JS... so HTML elements get a class according to className

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('comments')
);

// "It is important that ReactDOM.render remain at the bottom of the script for this tutorial. ReactDOM.render should only be called after the composite components have been defined."

// "The <div> tags are not actual DOM nodes; they are instantiations of React div components."
