import DescribeImage from '../../components/user/types/DescribeImage'
import TypeWhatYouHear from '../../components/user/types/TypeWhatYouHear'
import SelectTheMainIdea from '../../components/user/types/SelectTheMainIdea'
import SelectTheBestTitle from '../../components/user/types/SelectTheBestTitle'
import HighlightTheAnswer from '../../components/user/types/HighlightTheAnswer'
import ListenAndSelectWord from '../../components/user/types/ListenAndSelectWord'
import RespondInAtLeastWord from '../../components/user/types/RespondInAtLeastWord'
import RecordSayingStatement from '../../components/user/types/RecordSayingStatement'
import SelectRealEnglishWords from '../../components/user/types/SelectRealEnglishWords'
import ResultDescribeImage from '../../components/admin/results/types/ResultDescribeImage'
import ResultTypeWhatYouHear from '../../components/admin/results/types/ResultTypeWhatYouHear'
import ResultSelectTheMainIdea from '../../components/admin/results/types/ResultSelectTheMainIdea'
import ResultSelectTheBestTitle from '../../components/admin/results/types/ResultSelectTheBestTitle'
import ResultHighlightTheAnswer from '../../components/admin/results/types/ResultHighlightTheAnswer'
import ResultListenAndSelectWords from '../../components/admin/results/types/ResultListenAndSelectWords'
import ResultRespondInAtLeastWords from '../../components/admin/results/types/ResultRespondInAtLeastWords'
import ResultRecordSayingStatement from '../../components/admin/results/types/ResultRecordSayingStatement'
import ResultSelectRealEnglishWords from '../../components/admin/results/types/ResultSelectRealEnglishWords'

const QUESTION_COMPONENTS = {
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

const ADMIN_QUESTION_COMPONENTS = {
   SELECT_REAL_ENGLISH_WORD: ResultSelectRealEnglishWords,
   LISTEN_AND_SELECT_WORD: ResultListenAndSelectWords,
   TYPE_WHAT_YOU_HEAR: ResultTypeWhatYouHear,
   DESCRIBE_IMAGE: ResultDescribeImage,
   RECORD_SAYING: ResultRecordSayingStatement,
   RESPOND_IN_AT_LEAST_N_WORDS: ResultRespondInAtLeastWords,
   HIGHLIGHTS_THE_ANSWER: ResultHighlightTheAnswer,
   SELECT_MAIN_IDEA: ResultSelectTheMainIdea,
   SELECT_THE_BEST_TITLE: ResultSelectTheBestTitle,
}

export { QUESTION_COMPONENTS, ADMIN_QUESTION_COMPONENTS }
