const Getters = {
  isFetchingSiteInfo( state ) {
    return state.fetchingSiteInfo;
  },
  isCreatingAuthor( state ) {
    return state.authorProcessingState.isCreating;
  },
  authorCreationError( state ) {
    return state.authorProcessingState.errors;
  },
  isUpdatingAuthor( state ) {
    return state.authorProcessingState.isUpdating;
  },
  authorEditingError( state ) {
    return state.authorProcessingState.errors;
  },
};

export default Getters;
