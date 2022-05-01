import Table from "../Table/Table";
import TableBody from "../Table/TableBody";
import TableHead from "../Table/TableHead";
import TableHeader from "../Table/TableHeader";
import TableRow from "../Table/TableRow";
import "./my_sport_prediction.scss";
import MySportPredictionTableRow from "./MySportPredictionTableRow";
import { v4 as uuidv4 } from "uuid";
import { FC } from "react";
import useSportPredictionViewModel from "../../application/controllers/sportPredictionViewModel";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import TableData from "../Table/TableData";
import {
    skeletonBaseColor,
    skeletonHighlightColor
} from "../../constants/colors";


const MySportPredictionTable: FC = () => {
    const { userPastPredictions, isLoadingUserPastPredictions, maxPredictions } =
        useSportPredictionViewModel();
    return (
        <div className="my__sport__prediction__table">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead title={""} />
                        <TableHead title={"date and time"} arrow />
                        <TableHead title={"match"} arrow />
                        <TableHead title={"status"} arrow />
                        <TableHead title={""} />
                        <TableHead title={""} />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoadingUserPastPredictions &&
                        [...Array(5)].map((_, idx) => (
                            <TableRow key={uuidv4()} forTableBody>
                                {[...Array(6)].map((_) => (
                                    <SkeletonTheme
                                        key={uuidv4()}
                                        enableAnimation={true}
                                        baseColor={skeletonBaseColor}
                                        highlightColor={skeletonHighlightColor}
                                    >
                                        <TableData text={""}>
                                            <Skeleton height={21} />
                                        </TableData>
                                    </SkeletonTheme>
                                ))}
                            </TableRow>
                        ))}

                    {!isLoadingUserPastPredictions &&
                    userPastPredictions.length === 0 &&
                        <TableRow forTableBody>
                            <TableData
                                text={""}
                                colSpan={6}
                            >
                                <span className="no__data">You have not made any Predictions yet</span>
                            </TableData>
                        </TableRow>
                    }

                    {!!userPastPredictions.length &&
                        userPastPredictions.map((prediction) => (
                            <MySportPredictionTableRow
                                key={uuidv4()}
                                prediction={prediction}
                                maxPredictions = {maxPredictions}
                            />
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default MySportPredictionTable;
