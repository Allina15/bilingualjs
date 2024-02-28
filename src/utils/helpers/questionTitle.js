export const questionTitle = (name) => {
   switch (name) {
      case 'SELECT_REAL_ENGLISH_WORD':
         return 'SELECT_REAL_ENGLISH_WORD'

      case 'LISTEN_AND_SELECT_WORD':
         return 'LISTEN_AND_SELECT_WORD'

      case 'TYPE_WHAT_YOU_HEAR':
         return 'TYPE_WHAT_YOU_HEAR'

      case 'DESCRIBE_IMAGE':
         return 'DESCRIBE_IMAGE'

      case 'RECORD_SAYING':
         return 'RECORD_SAYING'

      case 'HIGHLIGHTS_THE_ANSWER':
         return 'HIGHLIGHTS_THE_ANSWER'
      default:
         return name
   }
}
