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


def separate_by_publised_time(df, start, end):
    datetime_series = pd.to_datetime(df["publishedAt"])
    datetime_index = pd.DatetimeIndex(datetime_series.values)
    datetime_df = df.set_index(datetime_index)
    filtered_df = datetime_df.between_time(start, end)
    return filtered_df


if __name__ == "__main__":
    df_list = [df_first, df_second, df_third, df_fourth]
    df_time_list = []
    for i in range(len(df_list)):
        for j in range(1, 24):
            if j == 23:
                start = "23:00"
                end = "23:59"
                filtered_df = separate_by_publised_time(df_list[i], start, end)
            else:
                start = f"{j}:00"
                end = f"{j+1}:00"
                filtered_df = separate_by_publised_time(df_list[i], start, end)

            time_list = [i+1, start, filtered_df]
            df_time_list.append(time_list)

    for k in range(len(df_time_list)):
        data_list = df_time_list[k]
        path = "../dataset/by_time"
        filename = f"duration{data_list[0]}_{data_list[1]}_data.csv"
        df_time_list[k][2].to_csv(f"{path}/{filename}", encoding='utf-8', index=True)
        pass
    pass