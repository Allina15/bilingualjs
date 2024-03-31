import DescribeImage from '../../components/user/types/DescribeImage'
import TypeWhatYouHear from '../../components/user/types/TypeWhatYouHear'
import SelectTheMainIdea from '../../components/user/types/SelectTheMainIdea'
import SelectTheBestTitle from '../../components/user/types/SelectTheBestTitle'
import HighlightTheAnswer from '../../components/user/types/HighlightTheAnswer'
import ListenAndSelectWord from '../../components/user/types/ListenAndSelectWord'
import RespondInAtLeastWord from '../../components/user/types/RespondInAtLeastWord'
import RecordSayingStatement from '../../components/user/types/RecordSayingStatement'
import SelectRealEnglishWords from '../../components/user/types/SelectRealEnglishWords'

export const QUESTION_COMPONENTS = {
   SELECT_REAL_ENGLISH_WORD: SelectRealEnglishWords,
   LISTEN_AND_SELECT_WORD: ListenAndSelectWord,
   TYPE_WHAT_YOU_HEAR: TypeWhatYouHear,
   DESCRIBE_IMAGE: DescribeImage,
   RECORD_SAYING: RecordSayingStatement,
   RESPOND_IN_AT_LEAST_N_WORDS: RespondInAtLeastWord,
   HIGHLIGHTS_THE_ANSWER: HighlightTheAnswer,
   SELECT_MAIN_IDEA: SelectTheMainIdea,
   SELECT_THE_BEST_TITLE: SelectTheBestTitle,
}
