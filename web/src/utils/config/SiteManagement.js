const SiteManagementConstants = {
  CATEGORIES: {
    NEWS: {
      title: 'News',
      columns: [
        'id',
        'title',
        'created',
        'actions'
      ]
    },
    AUTHORS: {
      title: 'Authors',
      columns: [
        'id',
        'name',
        'created',
        'actions'
      ]
    },
    DOWNLOADS: {
      title: 'Downloads',
      columns: [
        'id',
        'title',
        'url',
        'actions'
      ]
    },
    POLLS: {
      title: 'Polls',
      columns: [
        'id',
        'title',
        'created',
        'actions'
      ]
    },
  },
};

export default SiteManagementConstants;
