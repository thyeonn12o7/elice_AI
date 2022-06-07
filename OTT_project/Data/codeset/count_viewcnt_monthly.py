import pandas as pd

df = pd.read_csv("../add_specific_publishedAt.csv", lineterminator="\n")
df.drop(df.columns[0], axis=1, inplace=True)

# df["publishedAt_specific_date"] = pd.to_datetime(df["publishedAt_specific_date"])


def view_count_monthly(start, end):
    filtered_df = df.loc[df["publishedAt_specific_date"].between(start, end)]
    view_count = filtered_df["view_count"].sum()
    return view_count

def monthly_indexing(start, end):
    filtered_df = df.loc[df["publishedAt_specific_date"].between(start, end)]
    index = len(filtered_df.index)
    return index


if __name__ == "__main__":
    view_count_dict = {}
    monthly_index = []
    months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    for year in [2020, 2021]:
        for month in months:
            start = f"{year}-{month}-01"
            end = f"{year}-{month}-31"
            key = f"{year}_{month}"
            view_count_per_month = view_count_monthly(start, end)
            view_count_dict.update({key : view_count_per_month})
            month_index = monthly_indexing(start, end)
            monthly_index.append(month_index)

    view_count_list = list(view_count_dict.items())
    view_count_df = pd.DataFrame(view_count_list)
    view_count_df.columns = ["Year-Month", "total_view_count"]

    view_count_df["total_numb_video"] = monthly_index
    view_count_df["Avg_view_count"] = view_count_df["total_view_count"]/view_count_df["total_numb_video"]

    view_count_df.to_csv('monthly_view_count_Data.csv', encoding='utf-8', index=True)
    pass