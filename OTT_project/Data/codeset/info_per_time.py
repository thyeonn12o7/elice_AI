import pandas as pd


def read_csv(path, filename):
    df = pd.read_csv(f"{path}/{filename}", lineterminator="\n")
    return df


def extract_info(df):
    numb_videos = len(df.index)
    view_cnt = df["view_count"].sum()
    likes_cnt = df["likes"].sum()
    comment_cnt = df["comment_count"].sum()
    info = [numb_videos, view_cnt, likes_cnt, comment_cnt]
    return info


if __name__ == "__main__":
    extracted_info_list = []
    for i in range(1, 5):
        for j in range(1, 24):
            path = f"../dataset/by_time/duration{i}"
            filename = f"duration{i}_{j}:00_data.csv"
            df = read_csv(path, filename)
            info = extract_info(df)
            information = [
                i,
                j,
                info[0],
                info[1],
                info[1] / info[0],
                info[2],
                info[2] / info[0],
                info[3],
                info[3] / info[0],
            ]
            extracted_info_list.append(information)

    df_information = pd.DataFrame(
        extracted_info_list,
        columns=[
            "duration",
            "published_time",
            "numb_videos",
            "view_cnt",
            "avg_view_cnt",
            "likes_cnt",
            "avg_likes_cnt",
            "comment_cnt",
            "avg_comment_cnt",
        ],
    )
    df_information.to_csv("information_per_time.csv", encoding="utf-8", index=True)
    pass
