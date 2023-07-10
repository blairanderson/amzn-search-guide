import "./styles.css";
import React from "react";

const SEED_DATA = {
  "Nitrile Gloves": "NITRILECARE",
  "Caution Tape": "Cordova"
};

function RandomSeedKey() {
  const keys = Object.keys(SEED_DATA);

  return keys[Math.floor(Math.random() * keys.length)];
}

export default function App() {
  const startingSearch = RandomSeedKey();
  const startingBrand = SEED_DATA[startingSearch];
  const params = {};
  const [sort, updateSort] = React.useState("exact-aware-popularity-rank");
  const [prime, updatePrime] = React.useState(true);
  const [brand, updateBrand] = React.useState(startingBrand);
  const [keywords, updateKeywords] = React.useState(startingSearch);

  if (keywords.toString().length > 0) {
    params["k"] = keywords;
  }

  if (prime && brand.toString().length > 0) {
    // p_85:2470955011,p_89:SAS Safety
    params["rh"] = `p_85:2470955011,p_89:${brand}`;
  } else if (brand.toString().length > 0) {
    params["rh"] = `p_89:${brand}`;
  } else if (prime) {
    params["rh"] = `p_85:2470955011`;
  }

  params["s"] = sort;

  const finalLink = `https://amazon.com/s?${new URLSearchParams({
    ...params,
    ref: "cheese"
  }).toString()}`;

  // https://www.amazon.com/s?k=nitrile+gloves&rh=p_85:2470955011,p_89:SAS Safety&dc&rnid=2470954011
  return (
    <div>
      <h1 className="display-1">Amazon Search Guide</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div className="row">
        <div className="col-sm-12 col-md-5">
          <dl>
            <dt>Sort By</dt>
            <dd>
              <select
                onChange={(e) => {
                  updateSort(e.target.value);
                }}
                value={sort}
                className="form-select"
              >
                <option value="exact-aware-popularity-rank">
                  Best Sellers
                </option>
                <option value="relevanceblender">Featured</option>
                <option value="price-desc-rank">Price: High to Low</option>
                <option value="price-asc-rank">Price: Low to High</option>
              </select>
            </dd>
            <dt>Query Keywords</dt>
            <dd>
              <InputButton value={keywords} onChange={updateKeywords} />
            </dd>
            <dt>Brand Name</dt>
            <dd>
              <InputButton value={brand} onChange={updateBrand} />
            </dd>
            <dt>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={prime}
                  onChange={(e) => {
                    updatePrime(!prime);
                  }}
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Prime Shipping Only
                </label>
              </div>
            </dt>
            <dd></dd>
          </dl>
        </div>
        <div className="col-sm-12 col-md-7">
          <p className="lead">Your Search On Amazon:</p>
          <PrettyOutputLink {...{ finalLink, params, brand, keywords }} />
        </div>
      </div>
      <p className="lead">Why is this useful?</p>
      <ul>
        <li>
          You can see the best-sellers natively on Amazon for a given brand
        </li>
        <li>Results mostly exclude ads</li>
        <li>Sometimes Amazon hides checkbox for "Prime"</li>
        <li>Sometimes Amazon hides Brand Selection</li>
        <li>
          Amazon default sort is not helpful "Featured"... we sort by
          best-selling first.
        </li>
      </ul>
    </div>
  );
}

function PrettyOutputLink({ finalLink, params, brand, keywords }) {
  if (brand.toString().length > 0 || keywords.toString().length > 0) {
    return (
      <a
        className="text-decoration-none"
        target="_blank"
        title="Search in a New Tab"
        rel="noreferrer noopener"
        href={finalLink}
      >
        <pre className="lead">{JSON.stringify(params, null, 4)}</pre>
      </a>
    );
  } else {
    return (
      <p className="lead alert alert-danger">
        You need to include Either a Brand Name OR Query Keywords OR both.
      </p>
    );
  }
}

function InputButton({ value, onChange }) {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-control"
      />
      {value.toString().length > 1 ? (
        <button
          onClick={(e) => {
            onChange("");
          }}
          className="btn btn-outline-danger"
          title="clear input field"
          type="button"
        >
          X
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
