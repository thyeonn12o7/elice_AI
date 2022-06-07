import pandas as pd

df = pd.read_csv("../add_specific_publishedAt.csv", lineterminator="\n")
df.drop(df.columns[0:2], axis=1, inplace=True)


def seperate_by_duration(start, end):
    filtered_df = df.loc[df["trending_date"].between(start, end)]
    return filtered_df


if __name__ == "__main__":
    duration = [
        ["2020-10-11", "2020-11-23"],
        ["2021-11-01", "2021-12-17"],
        ["2020-08-03", "2020-08-29"],
        ["2020-09-13", "2020-10-10"],
        ["2020-11-24", "2020-11-30"],
        ["2021-02-15", "2021-07-11"],
        ["2020-08-30", "2020-09-12"],
        ["2020-12-01", "2021-02-14"],
        ["2021-07-12", "2021-10-31"],
        ["2021-12-18", "2022-01-02"],
    ]
    DF_list = []
    for i in range(len(duration)):
        start = duration[i][0]
        end = duration[i][1]
        # dataframe_name = f"filtered_df_{i+1}"
        dataframe = seperate_by_duration(start, end)
        DF_list.append(dataframe)

    df_first = DF_list[0].append(DF_list[1])
    df_second = DF_list[2].append([DF_list[3], DF_list[4], DF_list[5]])
    df_third = DF_list[6].append(DF_list[7])
    df_fourth = DF_list[8].append(DF_list[9])

    df_first.to_csv('df_first_duration.csv', encoding='utf-8', index=True)
    df_second.to_csv('df_second_duration.csv', encoding='utf-8', index=True)
    df_third.to_csv('df_third_duration.csv', encoding='utf-8', index=True)
    df_fourth.to_csv('df_fourth_duration.csv', encoding='utf-8', index=True)
    pass
