import Badge from "./Badge";
import React from "react";
import "./BadgeCategory.css";
export default function BadgeCategory(){
    return (
        <>
        <div className="badge-category-div-container">
            <div className="badge-category-name-div">
                <h2>Nazwa_kategorii</h2>
            </div>
            <Badge/>
            <Badge/>
        </div>
        </>
    )
}