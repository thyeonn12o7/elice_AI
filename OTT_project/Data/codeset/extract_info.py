import pandas as pd

df_first = pd.read_csv(
    "../dataset/by_duration/df_first_duration.csv", lineterminator="\n"
)
df_first.drop(df_first.columns[0], axis=1, inplace=True)
df_second = pd.read_csv(
    "../dataset/by_duration/df_second_duration.csv", lineterminator="\n"
)
df_second.drop(df_second.columns[0], axis=1, inplace=True)
df_third = pd.read_csv(
    "../dataset/by_duration/df_third_duration.csv", lineterminator="\n"
)
df_third.drop(df_third.columns[0], axis=1, inplace=True)
df_fourth = pd.read_csv(
    "../dataset/by_duration/df_fourth_duration.csv", lineterminator="\n"
)
df_fourth.drop(df_fourth.columns[0], axis=1, inplace=True)


def get_info(df):
    numb_videos = len(df.index)
    view_cnt = df["view_count"].sum()
    likes_cnt = df["likes"].sum()
    comment_cnt = df["comment_count"].sum()
    info = [numb_videos, view_cnt, likes_cnt, comment_cnt]
    return info


if __name__ == "__main__":
    df_list = [df_first, df_second, df_third, df_fourth]
    extracted_info_list = []
    for i in range(len(df_list)):
        key = f"df_{i+1}"
        info = get_info(df_list[i])
        information = [key, info[0], info[1], info[1]/info[0], info[2], info[3]]
        extracted_info_list.append(information)

    df_information = pd.DataFrame(extracted_info_list, columns=["duration", "numb_videos", "view_cnt", "Avg_view_cnt", "likes_cnt", "comment_cnt"])
    df_information.to_csv('get_info_per_duration(2).csv', encoding='utf-8', index=True)
    pass
