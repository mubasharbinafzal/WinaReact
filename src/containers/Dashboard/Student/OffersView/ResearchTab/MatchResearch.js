import React, { useState } from "react"
import MultiCarouselPage from "./MultiCarouselPage"
import OfferCardDetail from "../OfferCardDetail"
export default function MatchResearch() {
  const [isDetail, setisDetail] = useState(false)
  const [offerID, setofferID] = useState("")

  const handleDetail = (id) => {
    setofferID(id)
    setisDetail(!isDetail)
  }

  return (
    <div className="matchResearch">
      <div className="carosoulProfileBox">
        <div className="genProfile text-center">
          {isDetail === false ? (
            <MultiCarouselPage handleDetail={handleDetail} />
          ) : (
            <OfferCardDetail offerID={offerID} setisDetail={handleDetail} />
          )}
        </div>
      </div>
    </div>
  )
}
