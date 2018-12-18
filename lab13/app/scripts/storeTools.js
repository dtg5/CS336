let StoreTools = {
    dispatchLoadingComments: function () {
        store.dispatch(ActionTools.loadingComments());
    },
    startLoadingComments: function() {
        this.dispatchLoadingComments();
        setInterval(this.dispatchLoadingComments, POLL_INTERVAL);
    },
    findComment: function(id, commentList) {
        for (var comment of commentList) {
            if (comment.id == id) {
                return { id: id, author: comment.author, text: comment.text };
            }
        }
        return { id: '',  author: '', text: '' };
    }
}