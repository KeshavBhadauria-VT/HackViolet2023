import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import {Profile} from '../profile'

const Details = () => {
    const router = useRouter()
    const { q } = router.query
    console.log(q);
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        if (router.isReady) {
          // Code using query
          console.log(router.query);
        }

      }, [router.isReady]);

    if (!router.isReady) {
        return (<div>loading.....</div>);
    }

    return (
        <Profile id={router.query.pids}></Profile>
    )
}

export default Details;