import CurrentTime from "@/components/current-time";
import LuckyScore from "@/components/lucky-score";
import TestBookActionAdd, { TestBookActionDelete } from "@/components/test-book-action";

export default function testBookActionPage() {


    return(
        <div>
            <LuckyScore />
            <CurrentTime />
            <hr />
            <TestBookActionAdd />
            <hr />
            <TestBookActionDelete />
            <hr />
        </div>
    )

}