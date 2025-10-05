import AddLocationForm from "@/components/AddLocationForm";
import UnvisitedLocation from "@/components/UnvisitedLocationList";
import VisitedLocation from "@/components/VisitedLocation";
import { db } from "@/firebase/config";
import { collection, doc, getDoc, getDocs, query, Timestamp, where } from "firebase/firestore";

type Props = {
    params: { id: string }
}

async function getGroupData(groupId: string) {
    // groupsのドキュメントIDを元にgroupsのデータを取得する
    const groupDocRef = doc(db, 'groups', groupId);
    const groupSnap = await getDoc(groupDocRef);

    if (!groupSnap.exists()) {
        console.log('エラー：指定されたIDのグループが存在しません。');
        return null;
    }

    const groupData = groupSnap.data();

    // groupsのドキュメントIDを元にlocationsのデータも取得する
    const locationsCollectionRef = collection(groupDocRef, 'locations');
    const locationsSnap = await getDocs(locationsCollectionRef);

    const locations = locationsSnap.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            name: data.name,
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() :new Date(),
            visited: data.visited || false,
        };
    });

    // locationsサブコレクションの中からvisited, unvisitedを取得
    const unvisitedLocations = locations.filter(location => !location.visited);
    const visitedLocations = locations.filter(location => location.visited);

    return {
        name: groupData.name,
        members: groupData.members,
        unvisitedLocations,
        visitedLocations,
    };
}

export default async function GroupHome({ params}: Props) {
    const { id: groupId } = await params;
    const groupData = await getGroupData(groupId);

    return (
        <div className="bg-sky-50 min-h-screen">
            <div className="lg:w-1/2 md:w-2/3 w-full m-auto px-5 md:px-0 pb-3 pt-10">
                <div className="mb-15">
                    <h1 className="md:text-4xl text-2xl font-bold md:mb-3 mb-2">{groupData?.name}</h1>
                    <div className="flex">
                        <p className="md:text-sm text-xs">
                            メンバー：{groupData?.members.join('・')}
                        </p>
                    </div>
                </div>

                <AddLocationForm groupId={groupId}/>

                <UnvisitedLocation groupId={groupId} locations={(groupData?.unvisitedLocations ?? [])}/>

                <VisitedLocation groupId={groupId} locations={(groupData?.visitedLocations ?? [])}/>

                {/* <VisitedList groupId={groupId} locations={[...(groupData?.unvisitedLocations ?? []), ...(groupData?.visitedLocations ?? [])]}/> */}

                {/* <div>
                    <h2>行きたい場所リスト</h2>
                    <ul>
                        {groupData?.unvisitedLocations.map((location) => (
                            <li key={location.id}>
                                <form action="">
                                    <input type="hidden" name="groupId" value={groupId}/>
                                    <input type="hidden" name="locationId" value={location.id}/>
                                    <input type="hidden" name="visited" value='true'/>
                                    <input type="checkbox" onChange={(e) => e.currentTarget.form?.requestSubmit()}/>
                                </form>
                                <span>
                                    {location.name}
                                </span>
                                <form action="">
                                    <input type="hidden" name="groupId" value={groupId}/>
                                    <input type="hidden" name="locationId" value={location.id}/>
                                    <button type="submit">削除</button>
                                </form>
                            </li>
                        ))}
                    </ul>
                </div> */}
            </div>
        </div>
    )
}